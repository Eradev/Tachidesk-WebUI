/*
 * Copyright (C) Contributors to the Suwayomi project
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { t } from 'i18next';
import { IExtension, TranslationKey } from '@/typings';
import { DefaultLanguage, langCodeToName } from '@/util/language';

export enum ExtensionState {
    INSTALLED = 'INSTALLED',
    UPDATE_PENDING = 'UPDATE_PENDING',
}

export type GroupedExtensionsResult<KEY extends string = string> = [KEY, IExtension[]][];

export type GroupedByExtensionState = {
    [state in ExtensionState]: IExtension[];
};

export type GroupedByLanguage = {
    [language in DefaultLanguage]: IExtension[];
} & {
    [language: string]: IExtension[];
};

export type GroupedExtensions = GroupedByExtensionState & GroupedByLanguage;

export const extensionLanguageToTranslationKey: { [state in ExtensionState | DefaultLanguage]: TranslationKey } = {
    [ExtensionState.INSTALLED]: 'extension.state.label.installed',
    [ExtensionState.UPDATE_PENDING]: 'extension.state.label.update_pending',
    [DefaultLanguage.ALL]: 'extension.language.all',
    [DefaultLanguage.OTHER]: 'extension.language.other',
    [DefaultLanguage.LOCAL_SOURCE]: 'source.local_source.title',
};

export const isExtensionStateOrLanguage = (languageCode: string): boolean =>
    [
        ExtensionState.INSTALLED,
        ExtensionState.UPDATE_PENDING,
        DefaultLanguage.ALL,
        DefaultLanguage.OTHER,
        DefaultLanguage.LOCAL_SOURCE,
    ].includes(languageCode as ExtensionState | DefaultLanguage);

export const translateExtensionLanguage = (languageCode: string): string =>
    isExtensionStateOrLanguage(languageCode)
        ? (t(extensionLanguageToTranslationKey[languageCode as ExtensionState | DefaultLanguage]) as string)
        : langCodeToName(languageCode);
