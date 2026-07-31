/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerToolboxs () {
    return `
<category name="%{BKY_TUBITV2TUIRALIGN_CATEGORY}" id="TUBITV2TUIRALIGN_CATEGORY" colour="#35A38B" secondaryColour="#35A38B">

    <label text="%{BKY_TUBITV2TUIRALIGN_SETUP}" />

    <block type="tubitv2tuiralign_init" id="tubitv2tuiralign_init">
    </block>

    <block type="tubitv2tuiralign_setpins" id="tubitv2tuiralign_setpins">
        <field name="FRONT">33</field>
        <field name="BACK">32</field>
        <field name="LEFT_FRONT">35</field>
        <field name="LEFT_BACK">34</field>
        <field name="RIGHT_FRONT">39</field>
        <field name="RIGHT_BACK">36</field>
    </block>

    <block type="tubitv2tuiralign_settargets" id="tubitv2tuiralign_settargets">
        <value name="FRONT">
            <shadow type="math_number">
                <field name="NUM">25</field>
            </shadow>
        </value>
        <value name="BACK">
            <shadow type="math_number">
                <field name="NUM">25</field>
            </shadow>
        </value>
        <value name="LEFT_FRONT">
            <shadow type="math_number">
                <field name="NUM">25</field>
            </shadow>
        </value>
        <value name="LEFT_BACK">
            <shadow type="math_number">
                <field name="NUM">25</field>
            </shadow>
        </value>
        <value name="RIGHT_FRONT">
            <shadow type="math_number">
                <field name="NUM">25</field>
            </shadow>
        </value>
        <value name="RIGHT_BACK">
            <shadow type="math_number">
                <field name="NUM">25</field>
            </shadow>
        </value>
    </block>

    <sep gap="36"/>
    <label text="%{BKY_TUBITV2TUIRALIGN_RUN}" />

    <block type="tubitv2tuiralign_align" id="tubitv2tuiralign_align">
    </block>

    <block type="tubitv2tuiralign_readir" id="tubitv2tuiralign_readir">
    </block>

</category>`;
}

exports = registerToolboxs;
