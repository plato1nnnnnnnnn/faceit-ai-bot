'use client';

import React, { useState } from 'react';
import DemoUpload from '../components/DemoUpload';
import TeammateChat from '../src/components/TeammateChat';
import NotificationSystem from '../src/components/NotificationSystem';

export default function DemoPage() {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState(null);

  const handleAnalysisComplete = async (file) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('demo', file);

      const response = await fetch('http://localhost:8000/analyze-demo', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      setAnalysisResult(result);
    } catch (error) {
      console.error('Error during analysis:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    try {
      const response = await fetch('http://localhost:8000/payments/yookassa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 500,
          currency: 'RUB',
          description: 'Оплата анализа демки',
        }),
      });

      const paymentData = await response.json();
      setPaymentUrl(paymentData.payment_url);
    } catch (error) {
      console.error('Error during payment:', error);
    }
  };

  const handleSBPPayment = async () => {
    try {
      const response = await fetch('http://localhost:8000/payments/sbp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 500,
          currency: 'RUB',
          description: 'Оплата анализа демки через СБП',
        }),
      });

      const paymentData = await response.json();
      setPaymentUrl(paymentData.payment_url);
    } catch (error) {
      console.error('Error during SBP payment:', error);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>AI-Анализ демок</h1>
        <p>Загрузите свою демку CS2 для получения подробного анализа игры и персональных рекомендаций</p>
      </div>

      <DemoUpload onAnalysisComplete={handleAnalysisComplete} />

      {loading && <p>Анализируем демку...</p>}

      {analysisResult && (
        <div className="analysis-result">
          <h3>Результаты анализа</h3>
          <pre>{JSON.stringify(analysisResult, null, 2)}</pre>
          <button onClick={handlePayment} className="btn btn-primary">Оплатить через YooKassa</button>
          <button onClick={handleSBPPayment} className="btn btn-secondary">Оплатить через СБП</button>
        </div>
      )}

      {paymentUrl && (
        <div className="payment-link">
          <p>Перейдите по ссылке для оплаты:</p>
          <a href={paymentUrl} target="_blank" rel="noopener noreferrer">Оплатить</a>
        </div>
      )}

      <TeammateChat />
      <NotificationSystem />

      <style>{`
        .page-container {
          min-height: 100vh;
          padding: 2rem 0;
          background: linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 100%);
        }

        .page-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .page-header h1 {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 1rem;
          background: linear-gradient(45deg, #ff5200, #ffaa00);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .page-header p {
          font-size: 1.2rem;
          color: #a1a1aa;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .analysis-result {
          margin-top: 2rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          color: #fafafa;
        }

        .analysis-result pre {
          white-space: pre-wrap;
          word-wrap: break-word;
        }

        .btn {
          margin-top: 1rem;
          padding: 0.5rem 1rem;
          background: #ff5200;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .btn:hover {
          background: #ffaa00;
        }

        .btn-secondary {
          margin-top: 1rem;
          padding: 0.5rem 1rem;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .btn-secondary:hover {
          background: #0056b3;
        }

        .payment-link {
          margin-top: 2rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          color: #fafafa;
        }

        .payment-link a {
          color: #ffaa00;
          text-decoration: none;
        }

        .payment-link a:hover {
          text-decoration: underline;
        }

        .feature-item p {
          color: #a1a1aa;
          font-size: 0.9rem;
          line-height: 1.4;
        }      `}</style>    </div>  );}