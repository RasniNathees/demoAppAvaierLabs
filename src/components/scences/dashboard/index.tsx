
import React from 'react';
import Layout from '../../layout';
import BorrowerCard from '../../subcomponents/borrowercard';
import BorrowerOverView from '../../subcomponents/borroweroverview';
import BrokerOverview from '../../subcomponents/brokeroverview';
const Dashboard = () => {
  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <BorrowerCard />
        </div>
         <div className="lg:col-span-1">
         <BorrowerOverView/>
        </div>
         <div className="lg:col-span-1">
         <BrokerOverview/>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;