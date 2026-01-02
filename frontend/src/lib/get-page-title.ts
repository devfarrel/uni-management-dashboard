export function getPageTitle(
    pathname: string,
    navItems: { title: string; to: string }[]
) {
    return navItems.find(item => item.to === pathname)?.title ?? "Dashboard"
}  