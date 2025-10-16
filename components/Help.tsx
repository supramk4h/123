
import React from 'react';
import { PageHeader } from './common/PageHeader';

const HelpSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-4">{title}</h2>
        <div className="space-y-3 text-gray-600">
            {children}
        </div>
    </div>
);

const Help: React.FC = () => {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <PageHeader title="Help & Support" />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HelpSection title="Quick Start Guide">
          <p><strong>1. Add Accounts:</strong> Start by navigating to the 'Accounts' section. Add your Farms, Customers, and Receivable Accounts (like bank or cash accounts).</p>
          <p><strong>2. Record a Sale:</strong> Go to the 'Sales' page. Fill out the new sale form, selecting the customer and farm you just added. The total is calculated automatically.</p>
          <p><strong>3. Log a Payment:</strong> When a customer pays you, go to the 'Payments' page and record the transaction. This will update the customer's balance.</p>
          <p><strong>4. View Reports:</strong> Explore the 'Reports' section to see your sales data, customer balances, and the Aging Report for overdue payments.</p>
        </HelpSection>

        <HelpSection title="System Use Instructions">
            <p><strong>Type & Guess Fields:</strong> For fields like 'Customer Name' or 'Farm Name', simply start typing. A list of matching options from your database will appear. Click one to select it.</p>
            <p><strong>Dashboard:</strong> Your dashboard gives you a live, at-a-glance summary of your business's key metrics.</p>
            <p><strong>Data Tables:</strong> All tables have a search bar at the top right. You can also click on column headers to sort the data.</p>
            <p><strong>Actions:</strong> The 'Actions' column in tables allows you to edit or delete records. A confirmation will be required before any deletion.</p>
        </HelpSection>

        <div className="lg:col-span-2">
            <HelpSection title="Troubleshooting & Contact Info">
                <p><strong>Problem: Data not saving?</strong> Ensure all required fields (marked with an asterisk or implied) are filled correctly before submitting a form.</p>
                <p><strong>Problem: Can't find a record?</strong> Double-check your spelling in the search bar and make sure no filters are active that might be hiding the record.</p>
                <hr className="my-4"/>
                <p>For further assistance or to report a bug, please contact our support team:</p>
                <ul className="list-disc list-inside ml-4">
                    <li><strong>Email:</strong> support@poultryerp.com</li>
                    <li><strong>Phone:</strong> 1-800-555-CHKN (2456)</li>
                </ul>
            </HelpSection>
        </div>
      </div>
    </div>
  );
};

export default Help;
