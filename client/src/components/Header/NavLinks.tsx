interface navLinksProps {
    label: string
    icon: string
    path: string
}

export const navLinks: navLinksProps[] = [
    {
        label: 'Home',
        icon: 'home',
        path: '/'
    },
    {
        label: 'Message',
        icon: 'near_me',
        path: '/message'
    },
    {
        label: 'Discover',
        icon: 'explore',
        path: '/discover'
    },
    {
        label: 'Notify',
        icon: 'favorite',
        path: '/notify'
    }
];