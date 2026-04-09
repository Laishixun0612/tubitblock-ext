/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerToolboxs () {
    return `
<category name="%{BKY_TYC8_CATEGORY}" id="TYC8_CATEGORY" colour="#00A1E4" secondaryColour="#0085BD">
    <block type="tyc8_begin" id="tyc8_begin"></block>
    <sep gap="36"/>
    <block type="tyc8_set_inverted" id="tyc8_set_inverted"></block>
    <block type="tyc8_motor_control" id="tyc8_motor_control">
        <value name="SPD">
            <shadow type="math_number">
                <field name="NUM">100</field>
            </shadow>
        </value>
    </block>
    <block type="tyc8_motor_variable">
        <value name="MN">
            <shadow type="math_number"><field name="NUM">1</field></shadow>
        </value>
        <value name="SPD">
            <shadow type="math_number"><field name="NUM">100</field></shadow>
        </value>
    </block>
    <block type="tyc8_stop_all" id="tyc8_stop_all"></block>
</category>`;
}
exports = registerToolboxs;
