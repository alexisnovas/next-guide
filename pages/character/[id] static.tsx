import React from 'react'
import { Character, GetCharacterResult } from '../../types';
import Image from 'next/image';
import imageLoader from '../../imageLoader';

export default function CharactersPage ({character}:  {character: Character}) {
  return (
    <div>
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

export const getStaticPaths = async() => {
    const res = await fetch("https://rickandmortyapi.com/api/character");
    const {results}: GetCharacterResult = await res.json();

    return {
        paths: results.map((character: Character) => {
            return { params: {id: String(character.id)}}
        }),
        fallback: false
    }

}

export const getStaticProps = async({params}: {params: { id: string }}) => {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${params.id}`);
    const character: Character = await res.json();

    return {
        props: {
            character
        }
    }
}