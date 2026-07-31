const tubitv2tuiralign = formatMessage => ({

    name: formatMessage({
        id: 'tubitv2tuiralign.name',
        default: '紅外線IR對牆校正'
    }),

    extensionId: 'tubitv2tuiralign',

    version: '1.0.0',
    supportDevice: ['arduinoEsp32'],
    author: 'HONG TU',
    iconURL: `assets/tuir.png`,

    description: formatMessage({
        id: 'tubitv2tuiralign.description',
        default: '適用於 TuBit V2 OTC/MTC 機器人套件的紅外線對牆校正控制。'
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
