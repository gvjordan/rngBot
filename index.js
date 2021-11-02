const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const srand = require('seeded-rand');

var jmgRNG = new Array();


const client = new Discord.Client();

function roll() {
//	return Math.floor((Math.random() * 100) + 1);
	return Math.floor((srand.random() * 100) + 1);
}

function compareSecondColumn(a, b) {
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] > b[1]) ? -1 : 1;
    }
}

client.once('ready', () => {
	console.log('RNGBot launched!');
});

client.on('message', message => {
	// console.log(message);
	
	if (message.content === prefix + 'ping') {
		message.channel.send('Pong.');
		console.log(client);
	} else if (message.content === prefix + 'roll') {
		var new_roll = roll();
		jmgRNG.push([message.member.displayName, new_roll]);
		message.channel.send(message.member.displayName + ' rolled a ' + new_roll);
		console.table(jmgRNG);
	} else if (message.content === prefix + 'rolls') {
		jmgRNG.sort(compareSecondColumn);
		var msg2send = "```";

		for(i=0; i < jmgRNG.length; i++) {
			msg2send += jmgRNG[i][0] + ": " + jmgRNG[i][1] + "\n";
		}

		message.channel.send(msg2send + "```");
	} else if (message.content === prefix + 'rolls clear') {
		jmgRNG = [];
		message.channel.send('Rolls cleared');
	} else if (message.content === prefix + 'reset') {
		jmgRNG = [];
		message.channel.send('Rolls cleared');
	}
});

client.login(token);