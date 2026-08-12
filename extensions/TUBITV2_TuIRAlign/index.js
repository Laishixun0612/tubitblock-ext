const tubitv2tuiralign = formatMessage => ({

    name: formatMessage({
        id: 'tubitv2tuiralign.name',
        default: 'TuIRAlign IR 靠牆校正'
    }),

    extensionId: 'tubitv2tuiralign',

    version: '2.0.0',
    supportDevice: ['arduinoEsp32'],
    author: 'HONG TU',
    iconURL: `assets/tuir.png`,

    description: formatMessage({
        id: 'tubitv2tuiralign.description',
        default: '適用 TuBit V2 OTC/MTC 機器人的 IR 靠牆校正控制，已更新 TuIRAlign v2.0 功能。'
    }),
    featured: true,
    blocks: 'blocks.js',
    generator: 'generator.js',
    toolbox: 'toolbox.js',
    translations: 'translations.js',
    library: 'lib',
    official: true,
    tags: ['kit'],
    helpLink: ''
});

module.exports = tubitv2tuiralign;
