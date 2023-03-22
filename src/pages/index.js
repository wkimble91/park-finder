import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar.js';
import styles from '@/styles/Home.module.css';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default function Home({ setSelectedParkData }) {
  const [parkData, setParkData] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSelectedClick = (item) => {
    setSelectedParkData(item);
  };

  const handleChange = async (e) => {
    setLoading(true);
    setParkData([]);
    const res = await fetch(
      `https://developer.nps.gov/api/v1/parks?limit=50&stateCode=${e}&api_key=${API_KEY}`
    );
    const data = await res.json();
    setParkData(data.data);
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Park Finder | Home</title>
      </Head>
      <Navbar />

      <main className={styles.hero}>
        <div className={styles.hero_header_container}>
          <h1 className={styles.header}>Park Finder</h1>
          <h2 className={styles.subheader}>Not all who wander are lost</h2>
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
        <div className={styles.selectedPark}>
          {parkData.length > 0 &&
            parkData.map((item, index) => {
              return (
                <Link
                  replace={true}
                  href={{
                    pathname: '/park',
                  }}
                  className={styles.selectedParkCard}
                  data-testid='card'
                  parkcode={item.parkCode}
                  key={index}
                  onClick={() => onSelectedClick(item)}
                >
                  <div
                    className={`${styles.selectedParkCardSide} ${styles.selectedParkCardSideFront}`}
                  >
                    <div className={styles.selectedParkCardImageContainer}>
                      <Image
                        className={styles.selectedParkCardImage}
                        alt={`Image of ${item.fullName}`}
                        src={item.images[0].url}
                        fill
                        quality='40'
                        sizes='(max-width: 900px) 94vw,
                      (max-width: 1200px) 44vw,
                      28vw'
                      />
                    </div>
                    <h1 className={styles.selectedParkCardName}>{item.name}</h1>
                  </div>

                  <div
                    className={`${styles.selectedParkCardSide} ${styles.selectedParkCardSideBack}`}
                  >
                    <p className={styles.selectedParkCardBackName}>
                      {item.fullName}
                    </p>
                    <div className={styles.selectedParkCardSideBackLeft}>
                      {item.entranceFees[0] && (
                        <p className={styles.selectedParkCardBackCost}>
                          <b>Entrance Fee:</b>{' '}
                          {item.entranceFees[0].cost === '0.00'
                            ? 'Free'
                            : '$' + item.entranceFees[0].cost}
                        </p>
                      )}
                      <div>
                        {item.contacts.emailAddresses[0].emailAddress && (
                          <p className={styles.selectedParkCardBackContact}>
                            <b>Email:</b>
                            <br />
                            {item.contacts.emailAddresses[0].emailAddress}
                          </p>
                        )}
                        {item.contacts.phoneNumbers[0] && (
                          <p className={styles.selectedParkCardBackContact}>
                            <b>Phone:</b>
                            <br />
                            {item.contacts.phoneNumbers[0].phoneNumber}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className={styles.selectedParkCardSideBackRight}>
                      {item.operatingHours[0] && (
                        <div className={styles.selectedParkCardBackHours}>
                          <p>
                            <b>Operating Hours:</b>
                          </p>
                          <ul>
                            <li>
                              <b>Sun:</b>{' '}
                              {item.operatingHours[0].standardHours.sunday}
                            </li>
                            <li>
                              <b>Mon:</b>{' '}
                              {item.operatingHours[0].standardHours.monday}
                            </li>
                            <li>
                              <b>Tues:</b>{' '}
                              {item.operatingHours[0].standardHours.tuesday}
                            </li>
                            <li>
                              <b>Wed:</b>{' '}
                              {item.operatingHours[0].standardHours.wednesday}
                            </li>
                            <li>
                              <b>Thur:</b>{' '}
                              {item.operatingHours[0].standardHours.thursday}
                            </li>
                            <li>
                              <b>Fri:</b>{' '}
                              {item.operatingHours[0].standardHours.friday}
                            </li>
                            <li>
                              <b>Sat:</b>{' '}
                              {item.operatingHours[0].standardHours.saturday}
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </main>
    </>
  );
}
