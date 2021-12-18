import { useState, useEffect } from 'react';
import { web3 } from '../lib/web3';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import ENS, { getEnsAddress } from '@ensdomains/ensjs';

const ens = new ENS({
  provider: web3.currentProvider,
  ensAddress: getEnsAddress('1'),
});

const EnsName = function ({ address }) {
  const [name, setName] = useState();
  // const [avatar, setAvatar] = useState();

  useEffect(() => {
    async () => {
      const n = await ens.getName(address);
      if (n.name) {
        setName(n.name);
      }
    };
  }, [address]);

  // useEffect(() => {
  //   async () => {
  //     if (name) {
  //       const a = await ens.name(name).getText('avatar');
  //       if (a) {
  //         setAvatar(a);
  //       }
  //     }
  //   };
  // }, []);

  let formattedAddress = address.substr(0, 8) + '...' + address.substr(-4);

  let icon = <Jazzicon diameter={32} seed={jsNumberForAddress(address)} />;

  return (
    <div className="eth-name">
      <div className="icon">
        {/* {avatar ? <image src={avatar} alt="avatar" /> : icon} */}
        {icon}
      </div>

      <div className="name">
        <span className="primary">{name ? name : formattedAddress}</span>
        <span className="secondary">{name ? formattedAddress : ''}</span>
      </div>
    </div>
  );
};

export default EnsName;
