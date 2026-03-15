export async function blockAds(page) {
    await page.route('**/*', (route) => {
        const blockedDomains = [
            'googlesyndication.com',
            'doubleclick.net',
            'googletagmanager.com',
            'google-analytics.com',
            'adservice.google.com',
            'amazon-adsystem.com',
            'pagead2.googlesyndication.com',
            'static.doubleclick.net',
        ];
        const url = route.request().url();
        if (blockedDomains.some(domain => url.includes(domain))) {
            route.abort();
        } else {
            route.continue();
        }
    });
}