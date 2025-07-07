import { useCounterStore } from './useCounterStore';

const Counter = () => {
    const { count, increment, decrement, isPositive } = useCounterStore();

    return (
        <div>
            <h2>Counter: {count}</h2>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
            <p>
                {isPositive() ? 'Count is positive' : 'Count is not positive'}
            </p>
        </div>
    );
};

export default Counter;