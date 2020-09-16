class CustomFanRow extends Polymer.Element {

	static get template() {
		return Polymer.html`
			<style is="custom-style" include="iron-flex iron-flex-alignment"></style>
			<style>
				:host {
					line-height: inherit;
				}
				.speed {
					min-width: 30px;
					max-width: 30px;
					height: 30px;
					margin-left: 2px;
					margin-right: 2px;
					background-color: #759aaa;
					border: 1px solid lightgrey; 
					border-radius: 4px;
					font-size: 10px !important;
					color: inherit;
					text-align: center;
					float: right !important;
					padding: 1px;
					cursor: pointer;
				}
			</style>
			<hui-generic-entity-row hass="[[hass]]" config="[[_config]]">
				<div class='horizontal justified layout' on-click="stopPropagation">
					<button
						class='speed'
						style='[[_firstColor]]'
						toggles name="[[_firstName]]"
						on-click='setSpeed'
						disabled='[[_firstState]]'>[[_firstText]]</button>
					<button
						class='speed'
						style='[[_secondColor]]'
						toggles name="[[_secondName]]"
						on-click='setSpeed'
						disabled='[[_secondState]]'>[[_secondText]]</button>
					<button
						class='speed'
						style='[[_thirdColor]]'
						toggles name="[[_thirdName]]"
						on-click='setSpeed'
						disabled='[[_thirdState]]'>[[_thirdText]]</button>
					<button
						class='speed'
						style='[[_fourthColor]]'
						toggles name="[[_fourthName]]"
						on-click='setSpeed'
						disabled='[[_fourthState]]'>[[_fourthText]]</button>
					<button
						class='speed'
						style='[[_fifthColor]]'
						toggles name="[[_fifthName]]"
						on-click='setSpeed'
						disabled='[[_fifthState]]'>[[_fifthText]]</button>
				</div>
			</hui-generic-entity-row>
        `;
    }

	static get properties() {
		return {
			hass: {
				type: Object,
				observer: 'hassChanged'
			},
			_config: Object,
			_stateObj: Object,
			_firstColor: String,
			_secondColor: String,
			_thirdColor: String,
			_fourthColor: String,
			_fifthColor: String,

			_firstText: String,
			_secondText: String,
			_thirdText: String,
			_fourthText: String,
			_fifthText: String,
			
			_firstName: String,
			_secondName: String,
			_thirdName: String,
			_fourthName: String,
			_fifthName: String,
			
			_firstState: Boolean,
			_secondState: Boolean,
			_thirdState: Boolean,
			_fourthState: Boolean,
			_fifthState: Boolean,

		}
	}

	setConfig(config) {
		this._config = config;
		
		this._config = {
			customTheme: false,
			sendStateWithSpeed: false,
			reverseButtons: false,
			isOffColor: '#f44c09',
			isOnLowColor: '#43A047',
			isOnMedColor: '#43A047',
			isOnHiColor: '#43A047',
			isOnOnColor: '#43A047',
			buttonInactiveColor: '#759aaa',
			customOffText: 'OFF',
			customLowText: 'LOW',
			customMedText: 'MED',
			customHiText: 'HIGH',
			customMaxText: 'MAX',
			...config
			};
	}

	hassChanged(hass) {

		const config = this._config;
		const stateObj = hass.states[config.entity];
		const custTheme = config.customTheme;
		const sendStateWithSpeed = config.sendStateWithSpeed;
		const revButtons = config.reverseButtons;

		const custOnLowClr = config.isOnLowColor;
		const custOnMedClr = config.isOnMedColor;
		const custOnHiClr = config.isOnHiColor;
		const custOnOnClr = config.isOnMaxColor;
		const custOffSpdClr = config.buttonInactiveColor;
		const custOffClr = config.isOffColor;

		const custOffTxt = config.customOffText;
		const custLowTxt = config.customLowText;
		const custMedTxt = config.customMedText;
		const custHiTxt = config.customHiText;
		const custOnTxt = config.customMaxText;
		
		let speed;
		if (stateObj && stateObj.attributes) {
			speed = stateObj.attributes.speed || 'off';
		}
		
		let low;
		let med;
		let high;
		let max;
		let offstate;
		
		if (stateObj && stateObj.attributes) {
			if (stateObj.state == 'on' && stateObj.attributes.speed == 'low') {
				low = 'on';
			} else if (stateObj.state == 'on' && stateObj.attributes.speed == 'medium') {
				med = 'on';
			} else if (stateObj.state == 'on' && stateObj.attributes.speed == 'high') {
				high = 'on';
			} else if (stateObj.state == 'on' && stateObj.attributes.speed == 'on') {
				max = 'on';
			} else {
				offstate = 'on';
			}
		}
		
		let lowcolor;
		let medcolor;
		let hicolor;
		let maxcolor;
		let offcolor;
				
		if (custTheme) {
			if (low == 'on') {
				lowcolor = 'background-color:' + custOnLowClr;
			} else {
				lowcolor = 'background-color:' + custOffSpdClr;
			}

			if (med == 'on') {
				medcolor = 'background-color:'  + custOnMedClr;
			} else {
				medcolor = 'background-color:' + custOffSpdClr;
			}
			
			if (high == 'on') {
				hicolor = 'background-color:'  + custOnHiClr;
			} else {
				hicolor = 'background-color:' + custOffSpdClr;
			}

			if (max == 'on') {
				oncolor = 'background-color:'  + custOnOnClr;
			} else {
				oncolor = 'background-color:' + custOffSpdClr;
			}
		
			if (offstate == 'on') {
				offcolor = 'background-color:'  + custOffClr;
			} else {
				offcolor = 'background-color:' + custOffSpdClr;
			}

		} else {

			if (low == 'on') {
				lowcolor = 'background-color: var(--primary-color)';
			} else {
				lowcolor = 'background-color: var(--disabled-text-color)';
			}
		
			if (med == 'on') {
				medcolor = 'background-color: var(--primary-color)';
			} else {
				medcolor = 'background-color: var(--disabled-text-color)';
			}
		
			if (high == 'on') {
				hicolor = 'background-color: var(--primary-color)';
			} else {
				hicolor = 'background-color: var(--disabled-text-color)';
			}

			if (max == 'on') {
				oncolor = 'background-color: var(--primary-color)';
			} else {
				oncolor = 'background-color: var(--disabled-text-color)';
			}
		
			if (offstate == 'on') {
				offcolor = 'background-color: var(--primary-color)';
			} else {
				offcolor = 'background-color: var(--disabled-text-color)';
			}
		}
	
		let offtext = custOffTxt;
		let lowtext = custLowTxt;
		let medtext = custMedTxt;
		let hitext = custHiTxt;
		let maxtext = custOnTxt;
		
		let maxname = 'on';
		let hiname = 'high';
		let medname = 'medium';
		let lowname = 'low';
		let offname = 'off';
		
			
		if (revButtons) {
			this.setProperties({
				_stateObj: stateObj,
				_firstState: offstate == 'on',
				_secondState: low == 'on',
				_thirdState: med == 'on',
				_fourthtate: high == 'on',
				_fifthState: max == 'on',

				_firstColor: offcolor,
				_secondColor: lowcolor,
				_thirdColor: medcolor,
				_fourthColor: hicolor,
				_fifthColor: maxcolor,

				_firstText: offtext,
				_secondText: lowtext,
				_thirdText: medtext,
				_fourthText: hitext,
				_fifthText: maxtext,

				_firstName: offname,
				_secondName: lowname,
				_thirdName: medname,
				_fourthName: hiname,
				_fifthName: maxname,
			});
		} else {
			this.setProperties({
				_stateObj: stateObj,
				_firstState: max == 'on',
				_secondState: high == 'on',
				_thirdState: med == 'on',
				_fourthState: low == 'on',
				_fifthState: offstate == 'on',

				_firstColor: maxcolor,
				_secondColor: hicolor,
				_thirdColor: medcolor,
				_fourthColor: lowcolor,
				_fifthColor: offcolor,

				_firstText: maxtext,
				_secondText: hitext,
				_thirdText: medtext,
				_fourthText: lowtext,
				_fifthText: offtext,

				_firstName: maxtext,
				_secondName: hiname,
				_thirdName: medname,
				_fourthName: lowname,
				_fifthName: offname,
			});
		}
    }

	stopPropagation(e) {
		e.stopPropagation();
	}

	setSpeed(e) {
		const speed = e.currentTarget.getAttribute('name');
		if( speed == 'off' ){
			this.hass.callService('fan', 'turn_off', {entity_id: this._config.entity});
			this.hass.callService('fan', 'set_speed', {entity_id: this._config.entity, speed: speed});
		} else {
			if(this._config.sendStateWithSpeed){
				this.hass.callService('fan', 'turn_on', {entity_id: this._config.entity});
			}
			this.hass.callService('fan', 'set_speed', {entity_id: this._config.entity, speed: speed});
		}
	}
}
	
customElements.define('fan-control-entity-row', CustomFanRow);
