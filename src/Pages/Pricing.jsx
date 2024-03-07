// Pricing.js
import React, { useState } from 'react';
import '../Css/pricing.css';
import { ButtonGroup, Button, Row, Col } from 'react-bootstrap';

const pricingData = [
  {
    name: 'Basic',
    monthlyPrice: 30,
    yearlyPrice: 320,
    emailAccounts: 2,
    Detergent_capsule_box: 1,
    Free_washes: 1,
  },
  {
    name: 'Exclusive',
    monthlyPrice: 60,
    yearlyPrice: 630,
    emailAccounts: 10,
    Detergent_capsule_box: 3,
    Free_washes: 7,
  }
];

function Pricing() {
  const [duration, setDuration] = useState('monthly');

  const handleDurationChange = (value) => {
    if (duration !== value) {
      setDuration(value);
    }
  };

  return (
    <div className="pricing-container">
      <div className="pricing-switcher">
        <ButtonGroup>
          <Button variant={duration === 'monthly' ? 'primary' : 'outline-primary'} onClick={() => handleDurationChange('monthly')}>Monthly</Button>
          <Button variant={duration === 'yearly' ? 'primary' : 'outline-primary'} onClick={() => handleDurationChange('yearly')}>Yearly</Button>
        </ButtonGroup>
      </div>
      <Row>
        {pricingData.map((plan, index) => (
          <Col key={index} md={6}>
            <div className="border p-3">
              {(duration === 'monthly' && (
                <div data-type="monthly">
                  <header className="pricing-header">
                    <h2>{plan.name}</h2>
                    <div className="price">
                      <span className="currency">$</span>
                      <span className="value">{plan.monthlyPrice}</span>
                      <span className="duration">mo</span>
                    </div>
                  </header>
                  <div className="pricing-body">
                    <ul className="pricing-features">
                      <li><em>{plan.emailAccounts}</em> Email Accounts</li>
                      <li><em>{plan.Detergent_capsule_box}</em> Detergent box</li>
                      
                      <li><em>{plan.Free_washes}</em> Free washes</li>
                      <li><em>Unlimited</em> Bandwidth</li>
                      <li><em>24/7</em> Support</li>
                    </ul>
                  </div>
                  <footer className="pricing-footer">
                    <a className="select" href="#">Sign Up</a>
                  </footer>
                </div>
              ))}
              {(duration === 'yearly') && (
                <div data-type="yearly">
                  <header className="pricing-header">
                    <h2>{plan.name}</h2>
                    <div className="price">
                      <span className="currency">$</span>
                      <span className="value">{plan.yearlyPrice}</span>
                      <span className="duration">yr</span>
                    </div>
                  </header>
                  <div className="pricing-body">
                    <ul className="pricing-features">
                      <li><em>{plan.emailAccounts}</em> Email Accounts</li>
                      <li><em>{plan.Detergent_capsule_box*12}</em> Detergent box</li>
                      <li><em>{plan.Free_washes*12}</em> Free washes</li>
                      <li><em>Unlimited</em> Bandwidth</li>
                      <li><em>24/7</em> Support</li>
                    </ul>
                  </div>
                  <footer className="pricing-footer">
                    <a className="select" href="#">Sign Up</a>
                  </footer>
                </div>
              )}
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Pricing;
