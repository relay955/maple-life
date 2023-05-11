import { goto } from '$app/navigation';

export async function routeToPage(route: string, replaceState: boolean) {
    await goto(`/${route}`, { replaceState })
}
export async function goBack(defaultRoute = '/home') {
    const ref = document.referrer;
    await goto(ref.length > 0 ? ref : defaultRoute)
}
