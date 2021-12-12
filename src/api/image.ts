import axios from 'axios';
import { makeMockHash } from 'seabug-sdk/src/mocks';

const mockDescription = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed erat aequius Triarium aliquid de dissensione nostra iudicare. Negat esse eam, inquit, propter se expetendam. Hoc non est positum in nostra actione. Cur iustitia laudatur?

Nos quidem Virtutes sic natae sumus, ut tibi serviremus, aliud negotii nihil habemus. Bonum incolumis acies: misera caecitas. At eum nihili facit; Indicant pueri, in quibus ut in speculis natura cernitur. Sed fortuna fortis; Consequens enim est et post oritur, ut dixi. At iam decimum annum in spelunca iacet.

Negat esse eam, inquit, propter se expetendam. Duo Reges: constructio interrete. Levatio igitur vitiorum magna fit in iis, qui habent ad virtutem progressionis aliquantum. Ita enim vivunt quidam, ut eorum vita refellatur oratio. Non pugnem cum homine, cur tantum habeat in natura boni; Satis est tibi in te, satis in legibus, satis in mediocribus amicitiis praesidii. Illud non continuo, ut aeque incontentae. Itaque rursus eadem ratione, qua sum paulo ante usus, haerebitis. Nam si beatus umquam fuisset, beatam vitam usque ad illum a Cyro extructum rogum pertulisset. Tollenda est atque extrahenda radicitus.`;

export const getImages = async () => {
  // const response = await axios.get('images');
  // return response;

  // mock construction

  const getRandomSizePathParams = () => {
    const offset = Math.round(Math.random() * 400 - 200);
    return `${600 + offset}/${600 - offset}`;
  };

  return [...Array(1000).keys()].map((i) => ({
    sha256hash: makeMockHash('aa00000000', i),
    path: `https://picsum.photos/id/${i}/${getRandomSizePathParams()}`,
    createdAt: new Date(),
    id: i + new Date().getTime(),
    title: `NFT ${i}: Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, quos`,
    description: mockDescription,
  }));
};

export const addImage = async (payload: { image: string; title: string }) => {
  const response = await axios.post('images', payload);
  return response;
};
