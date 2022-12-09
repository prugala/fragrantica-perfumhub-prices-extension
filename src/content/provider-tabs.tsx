import React from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Prices from "./prices";
import {Perfumehub} from "../provider/perfumehub";
import {Perfumomaniak} from "../provider/perfumomaniak";
import "../styles/provider-tabs.css";

const ProviderTabs = () => {
    const providers = [
        new Perfumehub(),
        new Perfumomaniak()
    ];
    return (
        <Tabs>
            <TabList id={'p_options_holder'} className={'provider_tab_list'}>
                {providers.map((provider, i) => <Tab key={i} className={'button primary'}>{provider.getName()}</Tab>)}
            </TabList>
            {providers.map((provider, i) => <TabPanel key={i}><Prices provider={provider}/></TabPanel>)}
        </Tabs>
    )
}

export default ProviderTabs
