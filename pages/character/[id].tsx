import React from 'react'
import { Character, GetCharacterResult } from '../../types';
import Image from 'next/image';
import imageLoader from '../../imageLoader';
import { GetServerSideProps } from 'next';
import Router, { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import styles from  '../../styles/Character.module.css';

export default function CharactersPage ({character}:  {character: Character}) {
  const router = useRouter();
  console.log(router.query.id); // Logged from client.

  return (
    <div className={styles.container}>
        <h1>{character.name}</h1>
        <Image
            unoptimized
            src={character.image}
            alt={character.name}
            width="200px"
            height={"200px"}
            loader={imageLoader}
        />
    </div>
  )
}


// Changed Static Props to get server side props
export const getServerSideProps: GetServerSideProps = async(context) => {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${context.query.id}`);
    const character: Character = await res.json();
    
    // Logged from server.
    console.log(context.query.id);
    return {
        props: {
            character
        }
    }
};

CharactersPage.getLayout = function getLayout(page: typeof CharactersPage){
    return <Layout>{page}</Layout>;
}
