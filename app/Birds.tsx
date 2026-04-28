import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

const MY_TOKEN = 'xxx';

export default function BirdsList() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('https://api.ebird.org/v2/ref/region/list/subnational2/US-NV', {
      headers: { 'X-eBirdApiToken': MY_TOKEN },
    })
      .then(response => setData(response.data))
      .catch(error => console.log(error));
  }, []);

  return <View><Text>{JSON.stringify(data)}</Text></View>;
}