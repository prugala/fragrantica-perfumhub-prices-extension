# Perfume prices browser extension
Extension adds perfume prices from (https://perfumehub.pl and https://perfumomaniak.pl) to:
- https://fragrantica.pl
- https://fragrantica.com
- https://parfumo.net

If you want to have prices displayed on another page, create issue or pull request (changes in backend repository required).

## Supported browsers
- Chrome (https://chrome.google.com/webstore/detail/ceny-perfum-na-fragrantic/doogfiddknakmlelpkdogjahcoppdpkp)
- Firefox (https://addons.mozilla.org/pl/firefox/addon/ceny-perfum-na-fragrantica/)
- Edge (https://microsoftedge.microsoft.com/addons/detail/ceny-perfum-na-fragnatica/iemnnlemdjphioffdjokcpdoomlpkcgl)
- Opera (with installed Chrome extension)

## How to build
- Chrome/Edge/Opera `npm run build`
- Firefox `npm run build-firefox`

## How to create ZIP extension file
- Chrome/Edge/Opera `npm run release`
- Firefox `npm run release-firefox`
