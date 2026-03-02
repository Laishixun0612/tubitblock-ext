const tubitv2_espnow = formatMessage => ({

    name: formatMessage({
        id: 'tubitv2_espnow.name',
        default: 'ESP-NOW'
    }),
    extensionId: 'tubitv2_espnow',

    version: '1.6.0',
    supportDevice: [ 'arduinoEsp32'],
    
    author: 'HONG TU 鴻兔科技',
    iconURL: `assets/espnow.png`,
    
    description: formatMessage({
        id: 'tubitv2_espnow.description',
        default: '與其他 EPS32 通訊'
    }),

    featured: true,
    blocks: 'blocks.js',
    generator: 'generator.js',
    toolbox: 'toolbox.js',
    translations: 'translations.js',
    library: 'lib',
    official: true,
    tags: ['communication'],
    helpLink: 'https://docs.espressif.com/projects/esp-idf/zh_CN/stable/esp32/api-reference/network/esp_now.html'
});

module.exports = tubitv2_espnow;
