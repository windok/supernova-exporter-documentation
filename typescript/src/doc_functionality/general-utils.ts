// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---
// MARK: - General utils
import { htmlSafeString } from './sandbox';

var hash = require('short-hash');

export function getFullYear(): string {
    return new Date().getFullYear().toString();
}

/* Check if javascript includes exact value */
export function includes(arr: string[], value: string): boolean {
    return arr.includes(value);
}

export function jsonDebug(data: any, options: { title?: string } = {}): string {
    const sanitized = {
        ...data,
        ...(data.parent ? { parent: '[sanitized]' } : {}),
        ...(data.children?.length ? { children: '[sanitized]' } : {}),
    }

    // console.log(JSON.stringify(sanitized))
    
    return (
      `<div style='font-size: 8px'>
        ${options?.title ? `<div>${options.title}</div>` : ''}
        <div style='max-width: 1200px'>
          <code style='font-family: monospace; margin: 0'>${htmlSafeString(JSON.stringify(sanitized, null, ' '))}</code>
        </div>
      </div>`
    );
}

/* Get current formatted datetime */
export function getFormattedDateTime(date = new Date()): string {
    return date.toLocaleString('en-us',{day:'numeric', month:'short', year:'numeric', hour12: false, hour: '2-digit', minute:'2-digit'});
}

/* hash custom CSS to hash so it can be used for versioning CSS */
export function generateCustomCSSHash(configuration: any): string {

    // only hash the selected keys – only the ones that are tokenized as CSS Custom Properties or added to custom.cs file
    const selectedKeys = [
        'customCSS',
        'customFontFamily',
        'lookAndFeelAccentColor',
        'lookAndFeelAccentAlternativeColor',
        'lookAndFeelAccentSurfaceColor',
        'themeConfiguration',
        'siteMaxWidth',
        'contentContainerWidth',
        'topNavigationStyle',
        'topNavigationBackground',
        'topNavigationHeight',
        'limitSiteMaxWidth',
        'sideNavigationStyle',
        'sideNavigationBackground',
        'headerLogoHeight',
        'iconStrokeWidth',
        'lookAndFeelHeaderLayoutStyle',
        'lookAndFeelHeaderBackgroundColor',
        'lookAndFeelHeaderTextColor',
        'advancedCustomizationCustomCSS'
    ];

    // Filter only configuration keys from selectedKeys
    const filteredConfiguration = Object.keys(configuration)
        .filter(key => selectedKeys.includes(key))
        .reduce((obj, key) => {
            obj[key] = configuration[key];
            return obj;
        }, {});

    return hash(JSON.stringify(filteredConfiguration));
}