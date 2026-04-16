import { useState, useEffect } from "react";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, googleProvider, db } from "../firebase";

export function useAuth() {
  // Текущий пользователь
  const [user, setUser] = useState(null);

  // Загружается ли информация
  const [loading, setLoading] = useState(true);

  // Слушаем изменения авторизации
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Пользователь вошёл — загружаем его данные из Firestore
        const userDoc = await getDoc(
          doc(db, "users", firebaseUser.uid)
        );

        if (userDoc.exists()) {
          // Пользователь уже есть в базе
          setUser(userDoc.data());
        } else {
          // Новый пользователь — создаём профиль
          const newUser = {
            uid: firebaseUser.uid,
            name: firebaseUser.displayName,
            email: firebaseUser.email,
            avatar: "∑",
            xp: 0,
            level: 1,
            tasksCompleted: 0,
            streak: 0,
            clan: null,
            createdAt: new Date().toISOString(),
          };

          // Сохраняем в Firestore
          await setDoc(doc(db, "users", firebaseUser.uid), newUser);
          setUser(newUser);
        }
      } else {
        // Пользователь вышел
        setUser(null);
      }
      setLoading(false);
    });

    // Отписываемся при размонтировании
    return () => unsubscribe();
  }, []);

  // Вход через Google
  async function signInWithGoogle() {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  // Выход
  async function logout() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  // Обновление XP
  async function addXP(amount) {
    if (!user) return;

    const newXP = user.xp + amount;
    const newLevel = Math.floor(newXP / 500) + 1;

    const updated = {
      ...user,
      xp: newXP,
      level: newLevel,
      tasksCompleted: user.tasksCompleted + 1,
    };

    await setDoc(doc(db, "users", user.uid), updated);
    setUser(updated);
  }

  return { user, loading, signInWithGoogle, logout, addXP };
}