import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { Footer } from '@/components/Footer.js';
import { Carousel } from 'react-bootstrap';
import styles from '@/styles/Home.module.css';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default function Home({ setSelectedParkData }) {
  const featuredParks1 = [
    {
      name: 'Great Smoky Mountains National Park',
      image: '/featuredParks/GSM.jpg',
      link: '/park?parkCode=grsm',
    },
    {
      name: 'Grand Canyon National Park',
      image: '/featuredParks/GC.jpg',
      link: '/park?parkCode=grca',
    },
    {
      name: 'Zion National Park',
      image: '/featuredParks/ZNP.jpg',
      link: '/park?parkCode=zion',
    },
  ];
  const featuredParks2 = [
    {
      name: 'Rocky Mountains National Park',
      image: '/featuredParks/RM.jpg',
      link: '/park?parkCode=romo',
    },
    {
      name: 'Acadia National Park',
      image: '/featuredParks/ANP.jpg',
      link: '/park?parkCode=acad',
    },
    {
      name: 'Yosemite National Park',
      image: '/featuredParks/YoNP.jpg',
      link: '/park?parkCode=yose',
    },
  ];
  const featuredParks3 = [
    {
      name: 'Yellowstone National Park',
      image: '/featuredParks/YeNP.jpg',
      link: '/park?parkCode=yell',
    },
    {
      name: 'Joshua Tree National Park',
      image: '/featuredParks/JT.jpg',
      link: '/park?parkCode=jotr',
    },
    {
      name: 'Glacier National Park',
      image: '/featuredParks/GNP.jpg',
      link: '/park?parkCode=glac',
    },
  ];

  return (
    <>
      <Head>
        <title>Park Finder | Home</title>
      </Head>
      <main className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContainerLeft}>
            <div>
              <h1 className={styles.heroHeader}>Park Finder</h1>
              <h2 className={styles.heroSubheader}>
                Not all who wander are lost
              </h2>
            </div>
            <Link href='/explore' className={styles.heroButton}>
              Find A Park <span>Near You</span>
              <svg className={styles.heroButtonSVG}>
                <use href='#icon-chevron-right-outline'>
                  <symbol id='icon-chevron-right-outline' viewBox='0 0 24 24'>
                    <path d='M10 20c-0.802 0-1.555-0.312-2.122-0.879-0.566-0.566-0.878-1.32-0.878-2.121s0.312-1.555 0.879-2.122l2.878-2.878-2.878-2.879c-0.567-0.566-0.879-1.32-0.879-2.121s0.312-1.555 0.879-2.122c1.133-1.132 3.109-1.133 4.243 0.001l7.121 7.121-7.122 7.121c-0.566 0.567-1.319 0.879-2.121 0.879zM10 6c-0.268 0-0.518 0.104-0.707 0.292-0.189 0.19-0.293 0.441-0.293 0.708s0.104 0.518 0.293 0.707l4.292 4.293-4.292 4.293c-0.189 0.189-0.293 0.439-0.293 0.707s0.104 0.518 0.293 0.707c0.378 0.379 1.037 0.378 1.414 0.001l5.708-5.708-5.708-5.707c-0.189-0.189-0.439-0.293-0.707-0.293z'></path>
                  </symbol>
                </use>
              </svg>
            </Link>
          </div>
          <div className={styles.heroContainerRight}>
            <Carousel
              fade
              indicators={false}
              className={styles.heroCarouselContainer}
            >
              {featuredParks1.map((park, index) => (
                <Carousel.Item
                  key={index}
                  interval={7000}
                  className={styles.heroCarouselContainer}
                >
                  <Link target='_blank' href={park.link}>
                    <Image
                      className={styles.heroCarousel}
                      priority
                      width='1000'
                      height='450'
                      src={park.image}
                      alt={park.name}
                    />
                    <span className={styles.heroCarouselTitle}>
                      {park.name}
                    </span>
                  </Link>
                </Carousel.Item>
              ))}
            </Carousel>
            <Carousel
              fade
              indicators={false}
              className={styles.heroCarouselContainer}
            >
              {featuredParks2.map((park, index) => (
                <Carousel.Item
                  key={index}
                  interval={7000}
                  className={styles.heroCarouselContainer}
                >
                  <Link target='_blank' href={park.link}>
                    <Image
                      className={styles.heroCarousel}
                      priority
                      width='1000'
                      height='450'
                      src={park.image}
                      alt={park.name}
                    />
                    <span className={styles.heroCarouselTitle}>
                      {park.name}
                    </span>
                  </Link>
                </Carousel.Item>
              ))}
            </Carousel>
            <Carousel
              fade
              indicators={false}
              className={styles.heroCarouselContainer}
            >
              {featuredParks3.map((park, index) => (
                <Carousel.Item
                  key={index}
                  interval={7000}
                  className={styles.heroCarouselContainer}
                >
                  <Link target='_blank' href={park.link}>
                    <Image
                      className={styles.heroCarousel}
                      priority
                      width='1000'
                      height='450'
                      src={park.image}
                      alt={park.name}
                    />
                    <span className={styles.heroCarouselTitle}>
                      {park.name}
                    </span>
                  </Link>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </div>
        <span>Mount Rainer National Park</span>
      </main>
      <Footer />
    </>
  );
}
