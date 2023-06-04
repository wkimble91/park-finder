import Head from 'next/head';
import Link from 'next/link';
import { Footer } from '@/components/Footer.js';
import styles from '@/styles/About.module.css';

export default function About() {
  return (
    <>
      <Head>
        <title>Park Finder | About</title>
      </Head>
      <main className={styles.about}>
        <div className={styles.aboutBox}>
          <h1 className={styles.aboutHeader}>About NPS</h1>
          <p className={styles.aboutDescription}>
            The National Park Service, an agency of the Department of the
            Interior, manages 62 protected areas in the United States known as
            national parks. These national parks are established through acts of
            the United States Congress. The first national park, Yellowstone,
            was created by President Ulysses S. Grant in 1872. Subsequently,
            Mackinac National Park was established in 1875 (later decommissioned
            in 1895), and followed by Rock Creek Park (which later merged into
            National Capital Parks), Sequoia, and Yosemite in 1890.
          </p>
          <p className={styles.aboutDescription}>
            In 1916, the National Park Service was established through the
            Organic Act with the purpose of preserving the landscapes, natural
            and historic features, as well as wildlife, while ensuring their
            enjoyment for present and future generations. The Act aimed to
            safeguard these resources in a manner that would leave them
            unimpaired. Prior to their designation as national parks, several of
            the existing parks had been previously protected as national
            monuments by presidential proclamation under the Antiquities Act
            before receiving elevated status through congressional action.
          </p>
          <p className={styles.aboutDescription}>
            In addition to the following figures, it's important to note that
            seven national parks, with six of them located in Alaska, are
            accompanied by a national preserve. These preserves have varying
            levels of protection and are managed together with the parks, yet
            they are regarded as separate units and are not included in the
            statistics presented below. The selection of national parks is based
            on several criteria, including breathtaking natural beauty,
            distinctive geological features, exceptional ecosystems, and
            recreational possibilities. However, these criteria are not always
            evaluated collectively. Conversely, national monuments are often
            chosen due to their historical or archaeological importance.
          </p>
          <p className={styles.aboutDescription}>
            Among the national parks, a total of fourteen have been recognized
            as UNESCO World Heritage Sites (WHS), while twenty-one national
            parks hold the designation of UNESCO Biosphere Reserves (BR).
            Notably, eight national parks have received recognition under both
            UNESCO programs, highlighting their exceptional value and
            significance in terms of both cultural heritage and ecological
            conservation.
          </p>
        </div>
        <Link
          href='/park?parkCode=noca'
          target='_blank'
          className={styles.aboutImages1}
        >
          <span>4th Least Visited Park</span>
          <span>North Cascades National Park</span>
        </Link>
        <Link
          href='/park?parkCode=kova'
          target='_blank'
          className={styles.aboutImages2}
        >
          <span>3rd Least Visited Park</span>
          <span>Kobuk Valley National Park</span>
        </Link>
        <Link
          href='/park?parkCode=npsa'
          target='_blank'
          className={styles.aboutImages3}
        >
          <span>2nd Least Visited Park</span>
          <span>National Park of American Samoa</span>
        </Link>
        <Link
          href='/park?parkCode=gaar'
          target='_blank'
          className={styles.aboutImages4}
        >
          <span>1st Least Visited Park</span>
          <span>Gates of the Arctic National Park</span>
        </Link>
      </main>
      <Footer />
    </>
  );
}
