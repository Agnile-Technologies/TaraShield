import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { addRisk } from '../store/riskAssessmentActions';
import Chart from 'chart.js/auto';
import './RiskAssessmentPage.css'; // Importing the CSS for styling

const RiskAssessmentPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const risks = useSelector((state) => state.riskAssessments.risks);
  const [riskMatrix, setRiskMatrix] = useState(null);

  const onSubmit = (data) => {
    dispatch(addRisk({ ...data, id: Date.now() }));
    reset();
    console.log("Risk added:", data);
  };

  useEffect(() => {
    const ctx = document.getElementById('riskMatrix').getContext('2d');
    if (riskMatrix) {
      riskMatrix.destroy();
    }
    const newRiskMatrix = new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: risks.map(risk => ({
          label: risk.name,
          data: [{ x: risk.probability, y: risk.impact }],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }))
      },
      options: {
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
            title: {
              display: true,
              text: 'Probability'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Impact'
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `Risk: ${context.dataset.label} (Probability: ${context.raw.x}, Impact: ${context.raw.y})`;
              }
            }
          }
        }
      }
    });
    setRiskMatrix(newRiskMatrix);

    return () => newRiskMatrix.destroy();
  }, [risks]);

  return (
    <div className="risk-assessment-page">
      <form onSubmit={handleSubmit(onSubmit)} className="risk-form">
        <input {...register('name')} placeholder="Risk Name" className="form-input" />
        <input {...register('impact')} placeholder="Impact" type="number" className="form-input" />
        <input {...register('probability')} placeholder="Probability" type="number" className="form-input" />
        <button type="submit" className="button-submit">Add Risk</button>
      </form>
      <div className="risk-matrix-container">
        <canvas id="riskMatrix" className="risk-matrix-chart"></canvas>
      </div>
    </div>
  );
};

export default RiskAssessmentPage;