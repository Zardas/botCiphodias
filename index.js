const Discord = require("discord.js");
const client = new Discord.Client();
//token = process.env.TOKEN;
token = process.env.TOKEN;

const listeCommandes = "Liste des commandes disponibles : \n -------------- \n 1 - !Liste salons vidéos : liste les salons émettant une notif lorsque une nouvelle vidéo y ait postée \n 2 - !Ajout salon vidéo *nom_salon* : ajoute le salon *nom_salon* à la liste des salons vidéos \n 3 - !Suppression salon vidéo *nom_salon* : supprime le salon *nom_salon* de la liste des salons vidéos";
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

client.on("ready", () => {
	console.log("Bot pret");
	client.user.setActivity("Tapez !help pour la liste des commandes disponibles");
}
);


client.on("message", message => {

	//Si le message a bien été envoyé sur un salon textuel
	if(checkChannel(message.channel.name) && checkNouvelleVideo(message.content)) {
		//Si le message commence bien par "Nouvelle vidéos :"
		id_channel = "511883927544266772";
		taverne = client.channels.get(id_channel);

		res = "Bonjour/bonsoir @everyone \n" + message.author + " a posté une nouvelle vidéos dans le salon " + message.channel + ". N'hésitez pas à aller y faire un tour :wink:";
		taverne.send(res);
	}


	//Ajout du channel dans la liste des channels autorisés
	if(message.content.startsWith("!Ajout salon vidéo : ")) {
		toAdd = message.content.substr(21);
		listVideoChannel.push(toAdd);
		message.reply("Le salon " + toAdd + " a été ajouté");
	}
	
	//Suppression du channel dans la liste des channels autorisés
	if(message.content.startsWith("!Suppression salon vidéo : ")) {
		toDelete = message.content.substr(27);

		if(checkChannel(toDelete)) {
			i = 0;
			while(i < listVideoChannel.length && listVideoChannel[i] != toDelete) {
				i++;
			}
			while(i < listVideoChannel.length) {
				listVideoChannel[i] = listVideoChannel[i+1];
				i++;
			}
			listVideoChannel.length = listVideoChannel.length-1;
			message.reply("Le salon " + toDelete + " a été supprimé");
		} else {
			message.reply("Le salon " + toDelete + " n'a jamais été ajouté");
		}

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

	//!help
	if(message.content.startsWith("!help") || message.content.startsWith('!aide')) {
		message.reply(listeCommandes);
	}
})

client.login(token);