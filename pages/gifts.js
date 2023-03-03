import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import Lottie from "lottie-react";
import cubesLoading from "../public/cubesloading.json";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'


export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        // 'footer',
      ])),
      // Will be passed to the page component as props
    },
  }
}

export default function Home(props) {
  const [myevent, setEvent] = useState('День Рожденья');
  const [gender, setGender] = useState('для женщины');
  const [age, setAge] = useState(30);
  const [priceMin, setPriceMin] = useState(25);
  const [priceMax, setPriceMax] = useState(100);
  const [hobbies, setHobbies] = useState('спорт, чтение, путешествия');
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation('common')
  // const temp = "1. Набор для танца - включающий в себя танцевальную одежду и аксессуары (от 25 до 100 долларов). 2. Спортивный набор - включающий в себя одежду и аксессуары для спорта (от 25 до 100 долларов). 3. Набор для фитнеса - включающий в себя спортивную одежду, аксессуары и принадлежности для фитнеса (от 25 до 100 долларов)"
  // const editedResult = [
  //   temp
  //     .slice(0, temp.indexOf("2. ")),
  //   temp
  //     .slice(temp.indexOf("2. "), temp.indexOf("3. ")),
  //   temp
  //     .slice(temp.indexOf("3. "), temp.length),
  // ]

  // console.log(editedResult);



  const [result, setResult] = useState([]);
  //let editedResult = []
  async function onSubmit(event) {
    event.preventDefault();
    // console.log(event.target[0].value);
    // console.log(event.target[1].value);
    // console.log(event.target[2].value);
    // console.log(event.target[3].value);
    // console.log(event.target[4].value);
    // console.log(event.target[5].value);
    // console.log(JSON.stringify({ myevent, priceMin, priceMax, gender, age, hobbies }));
    if (
      myevent === '' ||
      priceMin === '' ||
      priceMax === '' ||
      gender === '' ||
      age === '' ||
      hobbies === ''
    ) {
      alert(t("alert_empty_field"))
      return;
    }
    if (age > 120) {
      alert(t("alert_age_not_more"))
      return;
    }
    if (priceMin > priceMax) {
      alert(t("alert_price_error"))
      return;
    }
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      setResult('');
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        //body: { myevent, priceMin, priceMax, gender, age, hobbies },
        body: JSON.stringify({ myevent, priceMin, priceMax, gender, age, hobbies }),
      });
      const data = await response.json();
      console.log(data);

      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      const temp = data.result.replaceAll('\\n', ' ')
      const editedResult = [
        temp
          .slice(0, temp.indexOf("2. ")),
        temp
          .slice(temp.indexOf("2. "), temp.indexOf("3. ")),
        temp
          .slice(temp.indexOf("3. "), temp.length),
      ]
      setResult(
        editedResult
      );



      setLoading(false);
      //setAnimalInput("");
    } catch (error) {
      // Consider implementing your own error handling logic here
      alert(t("alert_generate_fail"))
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }


  return (
    <div>
      <Head>
        <title>OpenAI Gifts</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        {/* <img src="/dog.png" className={styles.icon} /> */}
        <h1> 🎁 💡</h1>
        {result &&
          <div
            className={styles.result}
          //dangerouslySetInnerHTML={{ __html: result }}
          >
            <ul>
              {result.map((arr, i) =>
                <li key={i}>{arr}</li>
              )}
            </ul>
          </div>
        }
        <h2>{props.locale}</h2>
        {/*Suggest gift generator*/}
        {
          result.length !== 0
            ?
            <h3>Придумать другие варианты подарка</h3>
            :
            <h3>Генератор идей для подарка</h3>
        }


        {loading
          ?
          (
            <div>
              <div
                style={{
                  alignSelf: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}>
                <Lottie
                  animationData={cubesLoading}
                  style={{
                    alignSelf: "center",
                    height: 350,
                    width: 350
                  }}
                />
              </div>
              {/* Looking for the best gift ideas 🎁 💡 */}
              <h3>Искусственный интеллект соображает вам лучшие идеи подарков </h3>
              {/* <img src="/loading.webp" className={styles.loading} /> */}


            </div>
          )
          :
          <form onSubmit={onSubmit}>
            {/* Event */}
            <label>событие</label>
            <input
              type="text"
              name="myevent"
              placeholder="Enter the event"
              value={myevent}
              onChange={(e) => setEvent(e.target.value)}
            />
            {/* For who is the gift? */}
            <label>для кого подарок?</label>
            <select
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              {/* Man */}
              <option value="для мужчины">м</option>
              {/* Woman */}
              <option value="для женщины">ж</option>
            </select>
            {/* Age */}
            <label>возраст</label>
            <input
              type="number"
              min={1}
              max={99}
              name="age"
              placeholder="Enter the age"
              value={age}
              onChange={(e) => setAge(Number.parseInt(e.target.value))}
            />
            {/* Price from */}
            <label>цена от</label>
            <input
              type="number"
              min={1}
              name="priceMin"
              placeholder="Enter the minimum price"
              value={priceMin}
              onChange={(e) => setPriceMin(Number.parseInt(e.target.value))}
            />
            {/* Price to */}
            <label>цена до</label>
            <input
              type="number"
              min={1}
              name="priceMax"
              placeholder="Enter the maximum price"
              value={priceMax}
              onChange={(e) => setPriceMax(Number.parseInt(e.target.value))}
            />
            {/* Hobbies */}
            <label>увлечения</label>
            <input
              className="last-input"
              type="text"
              name="hobbies"
              placeholder="Enter the hobbies"
              value={hobbies}
              onChange={(e) => setHobbies(e.target.value)}
            />
            {/* Generate Gift Ideas */}
            <input type="submit" value={t("придумать идею подарка")} />
          </form>
        }

        {/* {result &&
          <div
            className={styles.result}
          //dangerouslySetInnerHTML={{ __html: result }}
          >
            <ul>
              {result.map((arr, i) =>
                <li key={i}>{arr}</li>
              )}
            </ul>
          </div>
        } */}

      </main>
    </div>
  );
}

// { 


// "input_generate_gift": "Generate Gift Ideas", 
// "placeholder_age": "enter age", 
// "placeholder_event": "event", 
// "placeholder_hobby": "Enter a hobby", 
// "placeholder_man": "man", 
// "placeholder_max_price": "Enter the maximum price", 
// "placeholder_min_price": "Enter the minimum price", 
// "placeholder_woman": "woman", 
// "title_looking_for_the_ideas": "Looking for the best gift ideas 🎁 💡", 
// "title_suggest_gift": "Suggest gift generator" 
// }
