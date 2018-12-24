import admin from 'firebase-admin';

import serviceAccountKey from '../../serviceAccountKey';

interface Contact {
  fullName: string;
  phoneNumber: string;
  userId: string;
}

const initFirebase = async () => {
  try {
    admin
      .initializeApp({
        credential: admin.credential.cert(serviceAccountKey as
          | string
          | admin.ServiceAccount),
        databaseURL: 'https://strv-contacts-b4146.firebaseio.com',
      })
      .firestore()
      .settings({ timestampsInSnapshots: true });

    console.log('Firebase connection is running.'); // tslint:disable-line:no-console
  } catch (error) {
    /* tslint:disable-next-line:no-console */
    console.error(`Firebase connection error: ${error}.`);
  }
};

export const getContactList = async (userId: string) => {
  const collection = admin.firestore().collection('contacts');
  const getContacts = await collection.where('userId', '==', userId).get();

  return getContacts.docs.map(doc => doc.data());
};

export const addContact = async ({
  fullName,
  phoneNumber,
  userId,
}: Contact) => {
  const collection = admin.firestore().collection('contacts');
  const addedContact = await collection.add({
    fullName,
    phoneNumber,
    userId,
  });
  const getContact = await addedContact.get();

  return getContact.data();
};

export default initFirebase;
