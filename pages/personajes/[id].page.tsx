import {  NextPage,  GetServerSideProps } from 'next';
import { getCharacter } from "dh-marvel/services/marvel/marvel.service";
import Head from 'next/head';
import BodySingle from 'dh-marvel/components/layouts/body/single/body-single';
import { CardCharacter } from 'dh-marvel/components/ui/cardCharacter/CardCharacter';
import {  CharacterDataResult } from 'dh-marvel/features/marvel/character.types';

interface Props {
	character: CharacterDataResult
    id: number|string
}

const CharacterPage:NextPage<Props> = ({character, id}) => {    
   
	return (   
        <>
        <Head>
            <title>DH-Marvel Store</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <BodySingle title={"Personaje"}>
					    <CardCharacter data={character} />                       
             </BodySingle>   
           
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = Number(context.params?.id)
  const data = await getCharacter(id);
  return {
   props:{
    character:data,
    id
   }
  };
};


export default CharacterPage;