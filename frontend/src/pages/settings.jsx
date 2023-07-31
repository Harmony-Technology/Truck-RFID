import Head from 'next/head';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { React } from 'react';
import { SettingsScreen } from '@/sections/settings/settings-screen';

const Page = () => (
  <>
    <Head>
      <title>Settings</title>
    </Head>
    <SettingsScreen />
  </>
);

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
