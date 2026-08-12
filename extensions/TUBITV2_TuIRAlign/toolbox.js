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
    <label text="%{BKY_TUBITV2TUIRALIGN_PARAMETERS}" />

    <block type="tubitv2tuiralign_settolerance" id="tubitv2tuiralign_settolerance">
        <value name="PERCENT">
            <shadow type="math_number">
                <field name="NUM">5.0</field>
            </shadow>
        </value>
    </block>

    <block type="tubitv2tuiralign_setdeadbands" id="tubitv2tuiralign_setdeadbands">
        <value name="DISTANCE">
            <shadow type="math_number">
                <field name="NUM">0.3</field>
            </shadow>
        </value>
        <value name="ANGLE">
            <shadow type="math_number">
                <field name="NUM">0.3</field>
            </shadow>
        </value>
    </block>

    <block type="tubitv2tuiralign_setoutputlimits" id="tubitv2tuiralign_setoutputlimits">
        <value name="VX">
            <shadow type="math_number">
                <field name="NUM">20</field>
            </shadow>
        </value>
        <value name="VY">
            <shadow type="math_number">
                <field name="NUM">20</field>
            </shadow>
        </value>
        <value name="WZ">
            <shadow type="math_number">
                <field name="NUM">360</field>
            </shadow>
        </value>
        <value name="WZ_SCALE">
            <shadow type="math_number">
                <field name="NUM">2.5</field>
            </shadow>
        </value>
    </block>

    <sep gap="36"/>
    <label text="%{BKY_TUBITV2TUIRALIGN_PID}" />

    <block type="tubitv2tuiralign_setpidaxis" id="tubitv2tuiralign_setpidaxis">
        <field name="AXIS">Y</field>
        <value name="P">
            <shadow type="math_number">
                <field name="NUM">3.0</field>
            </shadow>
        </value>
        <value name="I">
            <shadow type="math_number">
                <field name="NUM">0</field>
            </shadow>
        </value>
        <value name="D">
            <shadow type="math_number">
                <field name="NUM">0.004</field>
            </shadow>
        </value>
    </block>

    <block type="tubitv2tuiralign_setpidxz" id="tubitv2tuiralign_setpidxz">
        <value name="X_P">
            <shadow type="math_number">
                <field name="NUM">5.0</field>
            </shadow>
        </value>
        <value name="X_I">
            <shadow type="math_number">
                <field name="NUM">0</field>
            </shadow>
        </value>
        <value name="X_D">
            <shadow type="math_number">
                <field name="NUM">0.035</field>
            </shadow>
        </value>
        <value name="Z_P">
            <shadow type="math_number">
                <field name="NUM">38</field>
            </shadow>
        </value>
        <value name="Z_I">
            <shadow type="math_number">
                <field name="NUM">0</field>
            </shadow>
        </value>
        <value name="Z_D">
            <shadow type="math_number">
                <field name="NUM">0.04</field>
            </shadow>
        </value>
    </block>

    <block type="tubitv2tuiralign_setpidall" id="tubitv2tuiralign_setpidall">
        <value name="Y_P">
            <shadow type="math_number">
                <field name="NUM">3.0</field>
            </shadow>
        </value>
        <value name="Y_I">
            <shadow type="math_number">
                <field name="NUM">0</field>
            </shadow>
        </value>
        <value name="Y_D">
            <shadow type="math_number">
                <field name="NUM">0.004</field>
            </shadow>
        </value>
        <value name="X_P">
            <shadow type="math_number">
                <field name="NUM">5.0</field>
            </shadow>
        </value>
        <value name="X_I">
            <shadow type="math_number">
                <field name="NUM">0</field>
            </shadow>
        </value>
        <value name="X_D">
            <shadow type="math_number">
                <field name="NUM">0.035</field>
            </shadow>
        </value>
        <value name="Z_P">
            <shadow type="math_number">
                <field name="NUM">38</field>
            </shadow>
        </value>
        <value name="Z_I">
            <shadow type="math_number">
                <field name="NUM">0</field>
            </shadow>
        </value>
        <value name="Z_D">
            <shadow type="math_number">
                <field name="NUM">0.04</field>
            </shadow>
        </value>
    </block>

    <sep gap="36"/>
<label text="%{BKY_TUBITV2TUIRALIGN_MAIN_RUN}" />


    <block type="tubitv2tuiralign_align" id="tubitv2tuiralign_align">
    </block>

    <block type="tubitv2tuiralign_align_timeout" id="tubitv2tuiralign_align_timeout">
        <value name="TIMEOUT">
            <shadow type="math_number">
                <field name="NUM">8</field>
            </shadow>
        </value>
        <value name="CONFIRM">
            <shadow type="math_number">
                <field name="NUM">1</field>
            </shadow>
        </value>
    </block>

<sep gap="36"/>
    <label text="%{BKY_TUBITV2TUIRALIGN_RUN}" />

    <block type="tubitv2tuiralign_readir" id="tubitv2tuiralign_readir">
    </block>

</category>`;
}

exports = registerToolboxs;
