const deepstream = require('deepstream.io-client-js');
const codeMirror = require('codemirror');
require('codemirror/mode/javascript/javascript');
const {name, version} = require('./package.json');

// https://codemirror.net/doc/manual.html#events
// https://deepstream.io/docs/client-js/datasync-record/

const init = `/* sharedscript

Type anything and have the browser execute the code!

Follow along with the demo leader by typing or copypasta.

*/

async function getExample() {
	return 100;
}

console.log('hello world');
`;

console.log(name, version, window.present);

const client = deepstream('localhost:6020').login();
const sync = client.record.getRecord('shared');

const sharedElem = document.getElementById('shared-code');
const sharedCode = codeMirror(sharedElem, {
	value: ``,
	mode: 'javascript',
	indentWithTabs: true,
	tabSize: 2,
	readOnly: true
});

const personalElem = document.getElementById('personal-code');
const personalCode = codeMirror(personalElem, {
	value: ``,
	mode: 'javascript'
});

async function executeCode() {
	try {
		console.log(window.eval(personalCode.getValue()));
	} catch (err) {
		console.error('eval failure', err);
	}
}

personalCode.on('keypress', (cm, e) => {
	if (e.keyCode === 13 && e.shiftKey) {
		e.preventDefault();
		executeCode();
	}
});

if (window.present) {
	// set initial
	sync.whenReady(() => {
		sharedCode.setValue(String(sync.get('code') || init));
		sharedCode.setOption('readOnly', false);
	});
	sharedCode.on('changes', cm => sync.set('code', String(cm.getValue())));
} else {
	sync.subscribe('code', value => sharedCode.setValue(value));
	personalCode.setValue(localStorage.getItem('code') || '');
	personalCode.on('changes', cm => {
		localStorage.setItem('code', cm.getValue());
	});
}
