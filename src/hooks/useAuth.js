import { useState, useEffect } from "react";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, googleProvider, db } from "../firebase";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userRef = doc(db, "users", firebaseUser.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const data = userDoc.data();

          // Проверяем streak
          const today = new Date().toDateString();
          const lastLogin = data.lastLoginDate;
          const yesterday = new Date(
            Date.now() - 86400000
          ).toDateString();

          let newStreak = data.streak || 0;
          let streakXP = 0;

          if (lastLogin === today) {
            // Уже заходил сегодня — ничего не меняем
            newStreak = data.streak || 0;
          } else if (lastLogin === yesterday) {
            // Заходил вчера — продолжаем streak
            newStreak = (data.streak || 0) + 1;
            streakXP = 5;
          } else {
            // Пропустил день — сбрасываем streak
            newStreak = 1;
            streakXP = 5;
          }

          const updated = {
            ...data,
            streak: newStreak,
            xp: (data.xp || 0) + streakXP,
            lastLoginDate: today,
          };

          await setDoc(userRef, updated);
          setUser(updated);

        } else {
          // Новый пользователь
          const today = new Date().toDateString();
          const newUser = {
            uid: firebaseUser.uid,
            name: firebaseUser.displayName,
            email: firebaseUser.email,
            avatar: "∑",
            xp: 5,
            level: 1,
            tasksCompleted: 0,
            streak: 1,
            lastLoginDate: today,
            clan: null,
            createdAt: new Date().toISOString(),
          };
          await setDoc(userRef, newUser);
          setUser(newUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  async function signInWithGoogle() {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  async function logout() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  // Добавляем XP пользователю
  async function addXP(amount, reason) {
    if (!user) return;

    const newXP = (user.xp || 0) + amount;

    // Уровень растёт каждые 500 XP
    const newLevel = Math.floor(newXP / 500) + 1;

    const updated = {
      ...user,
      xp: newXP,
      level: newLevel,
      tasksCompleted: reason === "task"
        ? (user.tasksCompleted || 0) + 1
        : (user.tasksCompleted || 0),
    };

    await setDoc(doc(db, "users", user.uid), updated);
    setUser(updated);

    return { newXP, newLevel, gained: amount };
  }

  return { user, loading, signInWithGoogle, logout, addXP };
}