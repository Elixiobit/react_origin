import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useLayoutEffect,
  // useReducer,
  memo,
} from "react";

const useMyHook = () => {
  const [messages, setMessages] = useState([
    { value: "hello", athor: "Bogdan" },
  ]);

  const [value, setValue] = useState("");

  return { messages, setMessages, value, setValue };
};

export const AppHooks = (props) => {
  const { messages, setMessages, value, setValue } = useMyHook();

  const handleSendMessage = () => {
    setMessages((state) => [...state, { value, athor: "Bogdan" }]);

    // setMessages((state) => {
    //   messages.push({ value, athor: "Bogdan" });
    //   return messages;
    // });
    setValue("");
  };

  const foo = useCallback(() => {}, []);

  const sum = useMemo(() => {
    console.log("memo");
    return 1 + 1;
  }, []);

  // асинхронен
  useEffect(() => {
    // для выполнения запросов
    // для выполнения подписок
    // для таймеров
    // для работы с дом
    // для работы с рефами
    // можно вызывать setState
    console.log("useEffect");
    // const id = setInterval(() => {
    //   setValue((s) => s + 1);
    // }, 500);
    return () => {
      console.log("componentWillUnmount");
      // clearInterval(id);
    };
  }, []);

  // синхронен
  useLayoutEffect(() => {
    // для выполнения запросов
    // для выполнения подписок
    // для таймеров
    // для работы с дом
    // для работы с рефами
    // можно вызывать setState
    console.log("useLayoutEffect");
    // const id = setInterval(() => {
    //   setValue((s) => s + 1);
    // }, 500);
    return () => {
      console.log("useLayoutEffect");
      // clearInterval(id);
    };
  }, []);

  return (
    <div>
      <h1>AppHooks {sum}</h1>
      <ul>
        {messages.map((message, id) => (
          <li key={id}>
            {message.value} = {message.athor}
          </li>
        ))}
      </ul>

      <input value={value} onChange={(e) => setValue(e.target.value)} />
      <button onClick={handleSendMessage}>send</button>
      <Test foo={foo} setValue={setValue} />
    </div>
  );
};

const Test = memo(() => {
  const { messages, setMessages, value, setValue } = useMyHook();
  console.log("render");
  return <h1>testt</h1>;
});
