import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Details(){

    const navigation = useNavigation();
    const route = useRoute();

    const incident = route.params.incident;
    const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" no valor de ${Intl.NumberFormat('pt-BR', {style:'currency', currency:'BRL'}).format(incident.value)}`;

    function navigateToIncidents(){
        navigation.goBack()
    }

    function sendEmail(){
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.title}`,
            recipients: ['pedrinhozenere@hotmail.com'],
            body: message
        })
    }

    function sendWhatsApp(){
        Linking.openURL(`whatsapp://send?phone=+556599241717&text=${message}`);
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />

                <TouchableOpacity 
                    onPress={navigateToIncidents}
                    style={styles.detailsButton}
                    >
                    <Feather name="arrow-left" size={24} color="#e02041" />
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>

                <Text style={styles.incidentProperty}>ONG:</Text>
                <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>
                

                <Text style={styles.incidentProperty}>Descrição:</Text>
                <Text style={styles.incidentValue}>{incident.description}</Text>

                <Text style={styles.incidentProperty}>Valor:</Text>
                <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', {style:'currency', currency:'BRL'})
                .format(incident.value)}
                </Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.contactBoxText}>Salve o dia!</Text>
                <Text style={styles.contactBoxText}>Seja o herói desse caso.</Text>

                <Text style={styles.contactBoxDescription}>Entre em contato:</Text>
                
                <View style={styles.actions}>
                    <TouchableOpacity 
                        onPress={sendWhatsApp}
                        style={styles.actionsButton}
                        >
                        <Text style={styles.actionsButtonText}>WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={sendEmail}
                        style={styles.actionsButton}
                        >
                        <Text style={styles.actionsButtonText}>E-mail</Text>
                    </TouchableOpacity>
                </View>

            </View>
           
        </View>
    );
}