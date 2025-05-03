import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
class TestUc1monitordevice:
    def setup_method(self, method):
        chrome_options = Options()
        chrome_options.add_argument("--headless")  # Run in headless mode
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("--window-size=1306,944")

        self.driver = webdriver.Chrome(options=chrome_options)
        self.wait = WebDriverWait(self.driver, 10)

    def teardown_method(self, method):
        self.driver.quit()

    def test_uc1monitordevice(self):
        self.driver.get("http://localhost:8080/index.php")

        self.wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, ".signin-container"))).click()
        self.wait.until(EC.presence_of_element_located((By.ID, "name"))).send_keys("Admin")
        self.wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, ".signin-container"))).click()
        self.wait.until(EC.presence_of_element_located((By.ID, "password"))).send_keys("zabbix")
        self.wait.until(EC.element_to_be_clickable((By.ID, "enter"))).click()

        self.wait.until(EC.element_to_be_clickable((By.LINK_TEXT, "Monitoring"))).click()
        self.wait.until(EC.element_to_be_clickable((By.LINK_TEXT, "Hosts"))).click()
        self.wait.until(EC.element_to_be_clickable((By.LINK_TEXT, "Camera 1"))).click()

        self.wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, ".menu-popup-overlay"))).click()
        self.wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "th:nth-child(3)"))).click()

        self.wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "tr:nth-child(1) .status-container > .status-red"))).click()
        self.wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "tr:nth-child(1) .status-red"))).click()

        status_text = self.wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, ".nowrap:nth-child(1)"))).text
        assert status_text == "Not available"