import Head from 'next/head';
import { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar.js';
import { Footer } from '@/components/Footer.js';
import Card from '@/components/Card.js';
import styles from '@/styles/Home.module.css';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default function Home({ setSelectedParkData }) {
  const [parkData, setParkData] = useState([]);

  const onSelectedClick = (item) => {
    setSelectedParkData(item);
  };

  const handleChange = async (e) => {
    setParkData([]);
    const res = await fetch(
      `https://developer.nps.gov/api/v1/parks?limit=50&stateCode=${e}&api_key=${API_KEY}`
    );
    const data = await res.json();
    setParkData(data.data);
  };

  return (
    <>
      <Head>
        <title>Park Finder | Home</title>
      </Head>
      <Navbar />

      <main className={styles.hero}>
        <div className={styles.heroHeaderContainer}>
          <h1 className={styles.heroHeader}>Park Finder</h1>
          <h2 className={styles.heroSubheader}>Not all who wander are lost</h2>
        </div>
        <div className={styles.stateSelector}>
          <select
            data-testid='dropDown'
            onChange={(e) => handleChange(e.target.value)}
            name='states'
            id='states'
            defaultValue={'none'}
          >
            <option value='none' disabled hidden>
              Select a State
            </option>
            <option value='AL'>Alabama</option>
            <option value='AK'>Alaska</option>
            <option value='AZ'>Arizona</option>
            <option value='AR'>Arkansas</option>
            <option value='CA'>California</option>
            <option value='CO'>Colorado</option>
            <option value='CT'>Connecticut</option>
            <option value='DE'>Delaware</option>
            <option value='DC'>District Of Columbia</option>
            <option value='FL'>Florida</option>
            <option value='GA'>Georgia</option>
            <option value='HI'>Hawaii</option>
            <option value='ID'>Idaho</option>
            <option value='IL'>Illinois</option>
            <option value='IN'>Indiana</option>
            <option value='IA'>Iowa</option>
            <option value='KS'>Kansas</option>
            <option value='KY'>Kentucky</option>
            <option value='LA'>Louisiana</option>
            <option value='ME'>Maine</option>
            <option value='MD'>Maryland</option>
            <option value='MA'>Massachusetts</option>
            <option value='MI'>Michigan</option>
            <option value='MN'>Minnesota</option>
            <option value='MS'>Mississippi</option>
            <option value='MO'>Missouri</option>
            <option value='MT'>Montana</option>
            <option value='NE'>Nebraska</option>
            <option value='NV'>Nevada</option>
            <option value='NH'>New Hampshire</option>
            <option value='NJ'>New Jersey</option>
            <option value='NM'>New Mexico</option>
            <option value='NY'>New York</option>
            <option value='NC'>North Carolina</option>
            <option value='ND'>North Dakota</option>
            <option value='OH'>Ohio</option>
            <option value='OK'>Oklahoma</option>
            <option value='OR'>Oregon</option>
            <option value='PA'>Pennsylvania</option>
            <option value='RI'>Rhode Island</option>
            <option value='SC'>South Carolina</option>
            <option value='SD'>South Dakota</option>
            <option value='TN'>Tennessee</option>
            <option value='TX'>Texas</option>
            <option value='UT'>Utah</option>
            <option value='VT'>Vermont</option>
            <option value='VA'>Virginia</option>
            <option value='WA'>Washington</option>
            <option value='WV'>West Virginia</option>
            <option value='WI'>Wisconsin</option>
            <option value='WY'>Wyoming</option>
          </select>
        </div>
        <div className={styles.parkContainer}>
          {parkData.length > 0 &&
            parkData.map((item, index) => {
              return (
                <Link
                  replace={true}
                  href={{
                    pathname: '/park',
                  }}
                  className={styles.parkCard}
                  data-testid='card'
                  parkcode={item.parkCode}
                  key={index}
                  onClick={() => onSelectedClick(item)}
                >
                  <Card
                    key={index}
                    index={index}
                    images={item.images}
                    name={item.name}
                    fullName={item.fullName}
                    parkCode={item.parkCode}
                    entranceFees={item.entranceFees}
                    emailAddresses={item.contacts.emailAddresses}
                    phoneNumbers={item.contacts.phoneNumbers}
                    operatingHours={item.operatingHours}
                  />
                </Link>
              );
            })}
        </div>
        <Footer />
      </main>
    </>
  );
}
