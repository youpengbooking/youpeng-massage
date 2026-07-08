using UnityEngine;
using UnityEngine.InputSystem;
using UnityEngine.SceneManagement;
using TMPro;

public class GameManager : MonoBehaviour
{
    public TextMeshProUGUI scoreText;
    public GameObject gameOverText;

    private float score = 0f;
    private bool isGameOver = false;

    void Start()
    {
        Time.timeScale = 1f;
        score = 0f;
        isGameOver = false;

        if (gameOverText != null)
            gameOverText.SetActive(false);

        if (scoreText != null)
            scoreText.text = "Score: 0";
    }

    void Update()
    {
        if (!isGameOver)
        {
            score += Time.deltaTime;

            if (scoreText != null)
                scoreText.text = "Score: " + Mathf.FloorToInt(score);
        }
        else
        {
            if (
                (Mouse.current != null && Mouse.current.leftButton.wasPressedThisFrame)
                ||
                (Touchscreen.current != null && Touchscreen.current.primaryTouch.press.wasPressedThisFrame)
            )
            {
                RestartGame();
            }
        }
    }

    public void GameOver()
    {
        if (isGameOver) return;

        isGameOver = true;

        int finalScore = Mathf.FloorToInt(score);

        if (scoreText != null)
            scoreText.text = "Final Score: " + finalScore;

        if (gameOverText != null)
            gameOverText.SetActive(true);

        Debug.Log("Game Over! Final Score: " + finalScore);

        Time.timeScale = 0f;
    }

    void RestartGame()
    {
        Time.timeScale = 1f;
        SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex);
    }
}
