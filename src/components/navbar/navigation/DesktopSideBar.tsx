/*
 * Copyright (C) Contributors to the Suwayomi project
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import { ListItemIcon, Tooltip, styled, ListItemButton } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { NavbarItem } from '@/typings';

const SideNavBarContainer = styled('div')(({ theme }) => ({
    height: '100vh',
    width: theme.spacing(8),
    backgroundColor: theme.palette.custom.dark,
    position: 'fixed',
    top: 0,
    left: 0,
    paddingTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
}));

interface IProps {
    navBarItems: Array<NavbarItem>;
}

export default function DesktopSideBar({ navBarItems }: IProps) {
    const { t } = useTranslation();
    const location = useLocation();
    const theme = useTheme();

    const iconFor = (path: string, IconComponent: any, SelectedIconComponent: any) => {
        if (location.pathname === path)
            return <SelectedIconComponent sx={{ color: 'primary.main' }} fontSize="large" />;
        return (
            <IconComponent sx={{ color: theme.palette.mode === 'dark' ? 'grey.A400' : 'grey.600' }} fontSize="large" />
        );
    };

    return (
        <SideNavBarContainer>
            {navBarItems.map(({ path, title, IconComponent, SelectedIconComponent }: NavbarItem) => (
                <Link to={path} style={{ color: 'inherit', textDecoration: 'none' }} key={path}>
                    <ListItemButton disableRipple key={title}>
                        <ListItemIcon sx={{ minWidth: '0' }}>
                            <Tooltip placement="right" title={t(title) as string}>
                                {iconFor(path, IconComponent, SelectedIconComponent)}
                            </Tooltip>
                        </ListItemIcon>
                    </ListItemButton>
                </Link>
            ))}
        </SideNavBarContainer>
    );
}
