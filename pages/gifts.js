import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import Lottie from "lottie-react";
import cubesLoading from "../public/cubesloading.json";

const Example = () => {
  return <Lottie animationData={cubesLoading} />;
};

export default function Home() {
  const [myevent, setEvent] = useState('Purim');
  const [gender, setGender] = useState('woman');
  const [age, setAge] = useState(30);
  const [priceMin, setPriceMin] = useState(25);
  const [priceMax, setPriceMax] = useState(100);
  const [hobbies, setHobbies] = useState('');
  const [loading, setLoading] = useState(false);

  const temp = "1. Набор для танца - включающий в себя танцевальную одежду и аксессуары (от 25 до 100 долларов). 2. Спортивный набор - включающий в себя одежду и аксессуары для спорта (от 25 до 100 долларов). 3. Набор для фитнеса - включающий в себя спортивную одежду, аксессуары и принадлежности для фитнеса (от 25 до 100 долларов)"
  const editedResult = [
    temp
      .slice(0, temp.indexOf("2. ")),
    temp
      .slice(temp.indexOf("2. "), temp.indexOf("3. ")),
    temp
      .slice(temp.indexOf("3. "), temp.length),
  ]

  console.log(editedResult);



  const [result, setResult] = useState([]);
  //let editedResult = []
  async function onSubmit(event) {
    event.preventDefault();
    console.log(event.target[0].value);
    console.log(event.target[1].value);
    console.log(event.target[2].value);
    console.log(event.target[3].value);
    console.log(event.target[4].value);
    console.log(event.target[5].value);
    console.log(JSON.stringify({ myevent, priceMin, priceMax, gender, age, hobbies }));
    if (
      myevent === '' ||
      priceMin === '' ||
      priceMax === '' ||
      gender === '' ||
      age === '' ||
      hobbies === ''
    ) {
      alert("One of the field empty!")
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
      alert("Failed to genrate gift ideas. Try later again!")
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
        <h3>Suggest gift generator</h3>

        {/* 
          <form onSubmit={onSubmit}>
          <label>Event</label>
          <input
            type="text"
            name="myevent"
            placeholder="Enter the event"
            value={myevent}
            onChange={(e) => setEvent(e.target.value)}
          />

          <label>For who is the gift?</label>
          <select
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="man">Man</option>
            <option value="woman">Woman</option>
          </select>

          <label>Age</label>
          <input
            type="number"
            min={1}
            max={99}
            name="age"
            placeholder="Enter the age"
            value={age}
            onChange={(e) => setAge(Number.parseInt(e.target.value))}
          />

          <label>Price from</label>
          <input
            type="number"
            min={1}
            name="priceMin"
            placeholder="Enter the minimum price"
            value={priceMin}
            onChange={(e) => setPriceMin(Number.parseInt(e.target.value))}
          />

          <label>Price to</label>
          <input
            type="number"
            min={1}
            name="priceMax"
            placeholder="Enter the maximum price"
            value={priceMax}
            onChange={(e) => setPriceMax(Number.parseInt(e.target.value))}
          />

          <label>Hobbies</label>
          <input
            className="last-input"
            type="text"
            name="hobbies"
            placeholder="Enter the hobbies"
            value={hobbies}
            onChange={(e) => setHobbies(e.target.value)}
          /> */}

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
              <h3>Looking for the best gift ideas 🎁 💡</h3>
              {/* <img src="/loading.webp" className={styles.loading} /> */}


            </div>
          )
          :
          <form onSubmit={onSubmit}>
            <label>Event</label>
            <input
              type="text"
              name="myevent"
              placeholder="Enter the event"
              value={myevent}
              onChange={(e) => setEvent(e.target.value)}
            />

            <label>For who is the gift?</label>
            <select
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="man">Man</option>
              <option value="woman">Woman</option>
            </select>

            <label>Age</label>
            <input
              type="number"
              min={1}
              max={99}
              name="age"
              placeholder="Enter the age"
              value={age}
              onChange={(e) => setAge(Number.parseInt(e.target.value))}
            />

            <label>Price from</label>
            <input
              type="number"
              min={1}
              name="priceMin"
              placeholder="Enter the minimum price"
              value={priceMin}
              onChange={(e) => setPriceMin(Number.parseInt(e.target.value))}
            />

            <label>Price to</label>
            <input
              type="number"
              min={1}
              name="priceMax"
              placeholder="Enter the maximum price"
              value={priceMax}
              onChange={(e) => setPriceMax(Number.parseInt(e.target.value))}
            />

            <label>Hobbies</label>
            <input
              className="last-input"
              type="text"
              name="hobbies"
              placeholder="Enter the hobbies"
              value={hobbies}
              onChange={(e) => setHobbies(e.target.value)}
            />
            <input type="submit" value="Generate gift ideas" />
          </form>
        }



        <div>
          {/* <Lottie
            animationData={cubesLoading}
            style={{ height: 350, width: 350 }}
          /> */}
        </div>

        {result &&
          <div
            className={styles.result}
          //dangerouslySetInnerHTML={{ __html: result }}
          >
            <ul>
              {result.map((arr, i) =>
                <li>{arr}</li>
              )}
            </ul>
          </div>
        }

      </main>
    </div>
  );
}
