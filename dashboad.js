// pages/dashboard.js
import { useState } from 'react';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_jwt_secret_key';

function Dashboard({ user }) {
  const [mealPlan, setMealPlan] = useState(null);

  const fetchMealPlan = async () => {
    const response = await fetch('/api/mealplan', {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const result = await response.json();
    setMealPlan(result.mealPlan);
  };

  return (
    <div>
      <h1>Welcome, {user.username}</h1>
      <button onClick={fetchMealPlan}>Get Meal Plan</button>
      {mealPlan && (
        <div>
          <h2>Your Meal Plan</h2>
          <p>Breakfast: {mealPlan.breakfast}</p>
          <p>Lunch: {mealPlan.lunch}</p>
          <p>Dinner: {mealPlan.dinner}</p>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const token = context.req.cookies.token;

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  try {
    const user = jwt.verify(token, JWT_SECRET);
    return { props: { user } };
  } catch {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
}

export default Dashboard;

