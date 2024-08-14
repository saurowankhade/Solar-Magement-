import { useQuery, useQueryClient } from '@tanstack/react-query';
import { collection, query, orderBy, onSnapshot, FieldPath } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { db } from '../Firebase/firebase';
import firestore from '../Firebase/Firestore';
import UserContext from '../Context/UserContext/UserContext';

export function useFirestoreDocuments(collectionName) {
    const [collectionRef, setCollectionRef] = useState(null);
    const { user } = useContext(UserContext);
    const queryClient = useQueryClient();

    useEffect(() => {
        if (user?.companyID) {
            const collectionNameToUse = collectionName === 'SolarData'
                ? `${user.companyID}TrackSolarData`
                : collectionName;
                
            setCollectionRef(collectionNameToUse);
        }
    }, [user, collectionName]);

    useEffect(() => {
        if (collectionRef) {
            const colRef = collection(db, collectionRef);
            const q = collectionRef === "Users"
                ? colRef
                : query(colRef, orderBy(new FieldPath('data', 'CreatedAt'), 'desc'))

            const unsubscribe = onSnapshot(q, (snapshot) => {
                const documents = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                queryClient.setQueryData([collectionRef], documents);
            }, (error) => {
                console.error("Snapshot error:", error);
            });

            return () => unsubscribe();
        }
    }, [collectionRef, queryClient]);

    return useQuery({
        queryKey: [collectionRef],
        queryFn: () => firestore.fetchDocuments(collectionRef),
        staleTime: Infinity,
        cacheTime: 30 * 60 * 1000,
        enabled: !!collectionRef && !!user,
        refetchOnWindowFocus: false,
    });
}
