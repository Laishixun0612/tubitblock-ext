const tyc8 = formatMessage => ({
    name: formatMessage({
        id: 'tyc8.name',
        default: 'TYC 8-Motor Expansion Board'
    }),
    extensionId: 'tyc8',
    version: '1.0.0',
    supportDevice: ['arduinoEsp32'],
    author: 'DongW X HONG TU',
    iconURL: `assets/tyc8.png`,
    description: formatMessage({
        id: 'tyc8.description',
        default: 'TYC ESP32 8-Channel Motor Expansion Board.'
    }),
    featured: true,
    blocks: 'blocks.js',
    generator: 'generator.js',
    toolbox: 'toolbox.js',
    translations: 'translations.js',
    library: 'lib',
    official: true,
    tags: ['shield'],
    helpLink: 'https://www.trgreat.com'
});
module.exports = tyc8;