import React, { Component } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/Card.module.css';

class Card extends Component {
  static defaultProps = {
    parkCode: '',
    images: [],
    fullName: '',
    name: '',
    entranceFees: [],
    contacts: {
      emailAddresses: [],
      phoneNumbers: [],
    },
    operatingHours: [],
    onSelectedClick: () => {},
  };
  render() {
    return (
      <div className={styles.Card}>
        <div className={`${styles.CardSide} ${styles.CardSideFront}`}>
          <div className={styles.CardImageContainer}>
            {this.props.images.length !== 0 ? (
              <Image
                className={styles.CardImage}
                alt={`Image of ${this.props.fullName}`}
                src={this.props.images[0].url}
                fill
                quality='40'
                sizes='(max-width: 900px) 94vw,
                      (max-width: 1200px) 44vw,
                      28vw'
              />
            ) : (
              <Image
                className={styles.CardImage}
                alt={`No Image Provided`}
                src='/No_Image.png'
                fill
                quality='40'
                sizes='(max-width: 900px) 94vw,
                      (max-width: 1200px) 44vw,
                      28vw'
              />
            )}
          </div>
          <h1 className={styles.CardName}>{this.props.name}</h1>
        </div>
        <div className={`${styles.CardSide} ${styles.CardSideBack}`}>
          <p className={styles.CardBackName}>{this.props.fullName}</p>
          <div className={styles.CardSideBackLeft}>
            {this.props.entranceFees[0] && (
              <p className={styles.CardBackCost}>
                <b>Entrance Fee:</b>{' '}
                {this.props.entranceFees[0].cost === '0.00'
                  ? 'Free'
                  : '$' + this.props.entranceFees[0].cost}
              </p>
            )}
            <div>
              {this.props.emailAddresses[0].emailAddress && (
                <p className={styles.CardBackContact}>
                  <b>Email:</b>
                  <br />
                  {this.props.emailAddresses[0].emailAddress}
                </p>
              )}
              {this.props.phoneNumbers[0] && (
                <p className={styles.CardBackContact}>
                  <b>Phone:</b>
                  <br />
                  {this.props.phoneNumbers[0].phoneNumber}
                </p>
              )}
            </div>
          </div>
          <div className={styles.CardSideBackRight}>
            {this.props.operatingHours[0] && (
              <div className={styles.CardBackHours}>
                <p>
                  <b>Operating Hours:</b>
                </p>
                <ul>
                  <li>
                    <b>Sun:</b>{' '}
                    {this.props.operatingHours[0].standardHours.sunday}
                  </li>
                  <li>
                    <b>Mon:</b>{' '}
                    {this.props.operatingHours[0].standardHours.monday}
                  </li>
                  <li>
                    <b>Tues:</b>{' '}
                    {this.props.operatingHours[0].standardHours.tuesday}
                  </li>
                  <li>
                    <b>Wed:</b>{' '}
                    {this.props.operatingHours[0].standardHours.wednesday}
                  </li>
                  <li>
                    <b>Thur:</b>{' '}
                    {this.props.operatingHours[0].standardHours.thursday}
                  </li>
                  <li>
                    <b>Fri:</b>{' '}
                    {this.props.operatingHours[0].standardHours.friday}
                  </li>
                  <li>
                    <b>Sat:</b>{' '}
                    {this.props.operatingHours[0].standardHours.saturday}
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
