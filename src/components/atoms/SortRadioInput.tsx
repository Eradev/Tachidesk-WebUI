/*
 * Copyright (C) Contributors to the Suwayomi project
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import ArrowDownward from '@mui/icons-material/ArrowDownward';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import React from 'react';
import RadioInput, { RadioInputProps } from '@/components/atoms/RadioInput';

interface IProps extends RadioInputProps {
    sortDescending?: boolean | null | undefined;
}

const SortRadioInput = React.memo(({ sortDescending, ...rest }: IProps) => (
    <RadioInput
        checkedIcon={sortDescending ? <ArrowDownward color="primary" /> : <ArrowUpward color="primary" />}
        {...rest}
    />
));

export default SortRadioInput;
