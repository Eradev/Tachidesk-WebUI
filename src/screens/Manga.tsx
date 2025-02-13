/*
 * Copyright (C) Contributors to the Suwayomi project
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { Warning } from '@mui/icons-material';
import { CircularProgress, IconButton, Stack, Tooltip, Box } from '@mui/material';
import React, { useContext, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import requestManager from '@/lib/RequestManager';
import NavbarContext from '@/components/context/NavbarContext';
import ChapterList from '@/components/manga/ChapterList';
import { useRefreshManga } from '@/components/manga/hooks';
import MangaDetails from '@/components/manga/MangaDetails';
import MangaToolbarMenu from '@/components/manga/MangaToolbarMenu';
import EmptyView from '@/components/util/EmptyView';
import LoadingPlaceholder from '@/components/util/LoadingPlaceholder';

const AUTOFETCH_AGE = 60 * 60 * 24; // 24 hours

const Manga: React.FC = () => {
    const { t } = useTranslation();

    const { setTitle, setAction } = useContext(NavbarContext);
    const { id } = useParams<{ id: string }>();
    const autofetchedRef = useRef(false);

    const { data: manga, error, isLoading, isValidating, mutate } = requestManager.useGetManga(id);

    const [refresh, { loading: refreshing }] = useRefreshManga(id);

    useEffect(() => {
        // Automatically fetch manga from source if data is older then 24 hours
        // Automatic fetch is done only once, to prevent issues when server does
        // not update age for some reason (ie. error on source side)
        if (manga == null) return;
        if (
            manga.inLibrary &&
            (manga.age > AUTOFETCH_AGE || manga.chaptersAge > AUTOFETCH_AGE) &&
            autofetchedRef.current === false
        ) {
            autofetchedRef.current = true;
            refresh();
        }
    }, [manga]);

    useEffect(() => {
        setTitle(manga?.title ?? t('manga.title'));
        setAction(null);
    }, [t, manga?.title]);

    useEffect(() => {
        setAction(
            <Stack direction="row" alignItems="center">
                {error && !isValidating && !refreshing && (
                    <Tooltip
                        title={
                            <>
                                {t('manga.error.label.request_failure')}
                                <br />
                                {error.message ?? error}
                            </>
                        }
                    >
                        <IconButton onClick={() => mutate()}>
                            <Warning color="error" />
                        </IconButton>
                    </Tooltip>
                )}
                {manga && (refreshing || isValidating) && (
                    <IconButton disabled>
                        <CircularProgress size={16} />
                    </IconButton>
                )}
                {manga && <MangaToolbarMenu manga={manga} onRefresh={refresh} refreshing={refreshing} />}
            </Stack>,
        );
    }, [t, error, isValidating, refreshing, mutate, manga, refresh]);

    if (error && !manga) {
        return <EmptyView message={t('manga.error.label.request_failure')} messageExtra={error.message ?? error} />;
    }
    return (
        <Box sx={{ display: { md: 'flex' }, overflow: 'hidden' }}>
            {isLoading && <LoadingPlaceholder />}

            {manga && <MangaDetails manga={manga} />}
            <ChapterList mangaId={id} />
        </Box>
    );
};

export default Manga;
