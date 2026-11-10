import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/Button.tsx';
import { Media } from './ui/Media.tsx';

interface HomeHeroProps {
  imageUrl?: string;
}

export default function HomeHero({ imageUrl }: HomeHeroProps) {
  return (
    <section className="ds-section">
      <div className="ds-container ds-grid-split">
        <div className="ds-stack">
          <span className="ds-eyebrow">Your Health, Our Priority</span>
          <h1>Book Appointments. Track Your Care. All in One Place.</h1>
          <p className="ds-lead">
            Our clinic patient portal lets you schedule visits with our doctors, review
            visit notes and prescriptions, and manage your bills and documents without
            picking up the phone. Whether you are a new patient or a returning one, booking
            care has never been easier.
          </p>
          <div className="ds-cluster">
            <Button variant="primary" size="lg" to="/patient/book">
              Book an Appointment
            </Button>
            <Button variant="ghost" size="lg" to="/patient/appointments">
              View My Appointments
            </Button>
          </div>
        </div>
        {imageUrl && (
          <Media src={imageUrl} alt="Clinic reception and care team" ratio="wide" />
        )}
      </div>
    </section>
  );
}