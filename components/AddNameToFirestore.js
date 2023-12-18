import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import firebase from '../firebase'; 

const AddNameToFirestore = () => {
  const [name, setName] = useState('');

  const handleAddName = async () => {
    console.log('Tentative d\'ajout du nom:', name);
    if (name.trim() === '') {
      Alert.alert('Erreur', 'Veuillez entrer un nom.');
      return;
    }

    try {
      await firebase.firestore().collection('names').add({
        name: name,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      Alert.alert('Succès', 'Nom ajouté avec succès à Firestore.');
      console.log('Nom ajouté avec succès.');
      setName(''); // Réinitialiser le champ après l'ajout
    } catch (error) {
      console.error('Erreur d\'ajout du nom à Firestore: ', error);
      Alert.alert('Erreur', 'Problème lors de l\'ajout du nom à Firestore.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Entrez un nom"
        value={name}
        onChangeText={setName}
      />
      <Button title="Ajouter à Firestore" onPress={handleAddName} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default AddNameToFirestore;
