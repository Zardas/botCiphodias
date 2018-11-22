const Discord = require("discord.js");
const client = new Discord.Client();
//token = process.env.TOKEN;
token = "NTE1MTA2MzQ3Mzk4NzI1NjM0.DtgWzA._Avw2ZnVCJcEZVzIXs-HikZ5Udg";

listVideoChannel = ["vos-vidéos"];

/*
 * Vérifie si le channel est bien dans listVideoChannel
*/
function checkChannel(channelName) {
	i = listVideoChannel.length -1;

	//On fait dans l'ordre décroissant pour ne pas avoir à stocker la borne dans une variable à part
	while(i >= 0 && listVideoChannel[i] != channelName) {
		i--;
	}
	return (i != -1);

}

function checkNouvelleVideo(message) {
	//TODO : faire avec des regex pour que ce soit moins moche
	return (message.startsWith('Nouvelle vidéo') || message.startsWith('Nouvelle video') || message.startsWith('nouvelle vidéo') || message.startsWith('Nouvelle vidéo'))
}

client.on("message", message => {

	//Si le message a bien été envoyé sur un salon textuel
	if(checkChannel(message.channel.name) && checkNouvelleVideo(message.content)) {
		//Si le message commence bien par "Nouvelle vidéos :"
		id_channel = "515108121690243074";
		taverne = client.channels.get(id_channel);

		res = "@everyone " + message.author + " a upload une nouvelle vidéos dans le salon " + message.channel + ". N'hésitez pas à aller y faire un tour :wink:";
		taverne.send(res);
	}


	//Ajout du channel dans la liste des channels autorisés
	if(message.content.startsWith("Ajout salon vidéo : ")) {
		listVideoChannel.push(message.content.substr(20));
	}
	
	//Affichage des channels autorisés
	if(message.content.startsWith("!Liste salons vidéos")) {
		res = "";
		size = listVideoChannel.length;
		for(i = 0 ; i < size ; i++) {
			res = res + listVideoChannel[i] + " ; ";
		}
		message.reply(res);
	}
})

client.login(token);